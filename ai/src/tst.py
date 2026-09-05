from src.rag.embedding.embedder import get_embedding_model
from src.rag.vector_store.chroma import ChromaStore


def cosine_similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))

    norm_a = sum(x * x for x in a) ** 0.5
    norm_b = sum(x * x for x in b) ** 0.5

    return dot / (norm_a * norm_b)


embedding_model = get_embedding_model()
store = ChromaStore()

query = "¿Cuánto cuesta un corte de cabello?"

query_embedding = embedding_model.get_query_embedding(query)

results = store.collection.get(
    include=["documents", "metadatas", "embeddings"]
)

print("\n==============================")
print("REAL CHUNKS")
print("==============================")

items = []

for document, metadata, embedding in zip(
    results["documents"],
    results["metadatas"],
    results["embeddings"],
):
    similarity = cosine_similarity(
        query_embedding,
        embedding,
    )

    items.append(
        {
            "file": metadata["file_name"],
            "similarity": similarity,
            "text": document,
        }
    )


items.sort(
    key=lambda x: x["similarity"],
    reverse=True
)


for index, item in enumerate(items[:10], start=1):

    print(f"\n--- {index} ---")

    print(
        f"File: {item['file']}"
    )

    print(
        f"Similarity: {item['similarity']:.4f}"
    )

    print(
        f"Text:\n{item['text'][:500]}"
    )