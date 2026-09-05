import logging

from src.rag.ingestion.loader import load_documents
from src.rag.ingestion.chunker import create_chunks
from src.rag.embedding.embedder import create_embedding
from src.rag.vector_store.chroma import ChromaStore

from src.config.logging import setup_logging

setup_logging()
logger = logging.getLogger(__name__)


def test_pipeline_ingestion():
    logger.info("Iniciando carga de documentos")
    documents = load_documents()
    nodes = create_chunks(documents=documents)
    chroma = ChromaStore()
    chroma.reset_collection()

    embeddings = create_embedding(nodes=nodes)
    ids = [node.node_id for node in nodes]
    texts = [node.text for node in nodes]
    metadatas = [node.metadata for node in nodes]

    chroma.upsert_documents(
        ids=ids,
        documents=texts,
        metadatas=metadatas,
        embeddings=embeddings
    )

    for index, node in enumerate(nodes[:5], start=1):
        print(f"\n--- CHUNK {index} ---")
        print(f"Node ID: {node.node_id}")
        print(f"Metadata: {node.metadata}")
        print(f"Texto:\n{node.text[:500]}")

    print("\n================================")
    print("EMBEDDING TEST")
    print("================================")

    print(f"Chunks: {len(nodes)}")
    print(f"Embeddings: {len(embeddings)}")
    print(f"Dimension: {len(embeddings[0])}")
    print(f"First values: {embeddings[0][:10]}")

    print(f"Documents stored: {chroma.count()}")

if __name__ == "__main__":
    test_pipeline_ingestion()
