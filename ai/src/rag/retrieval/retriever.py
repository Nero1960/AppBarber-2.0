import chromadb

from src.config.logging import logging
from src.rag.embedding.embedder import get_embedding_model
from src.rag.vector_store.chroma import ChromaStore

def retrieve(
        query: str,
        top_k: int = 5
):

    """
        retrive relevant most for query
    """

    logging.info(f"Retrievin context for query {query}")

     # 1. Get embedding model
    embedding_model = get_embedding_model()

    # 2. Convert query into an embedding
    query_embedding = embedding_model.get_query_embedding(query)

    # 3. Connect to vector store
    vector_store = ChromaStore()

    # 4. Search similar chunks
    results = vector_store.query(
        embedding=query_embedding,
        top_k=top_k,
    )

    logging.info(
        f"Retrieved {len(results['documents'][0])} chunks"
    )

    return results




