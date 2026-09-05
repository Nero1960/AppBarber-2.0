from src.rag.retrieval.retriever import retrieve
from src.rag.generation.generator import generate_answer

MAX_DISTANCE = 1.5


def ask(question: str, top_k: int = 5) -> dict:
    """
    Execute the complete RAG pipeline.
    """

    # 1. Retrieve relevant chunks
    results = retrieve(
        query=question,
        top_k=top_k,
    )

    # 2. Extract data
    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    # 3. Filter by distance (exclude irrelevant chunks)
    filtered_docs = []
    filtered_sources = []

    for doc, metadata, distance in zip(documents, metadatas, distances):
        if distance <= MAX_DISTANCE:
            filtered_docs.append(doc)
            filtered_sources.append({
                "file_name": metadata.get("file_name"),
                "page": metadata.get("page_label"),
            })

    # 4. Build context
    context = "\n\n".join(filtered_docs)

    # 5. Generate answer
    answer = generate_answer(
        question=question,
        context=context,
    )

    return {
        "answer": answer,
        "sources": filtered_sources,
    }