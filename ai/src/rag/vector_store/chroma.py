import chromadb

from src.config.settings import settings


class ChromaStore:

    def __init__(self):
        self.client = chromadb.PersistentClient(
            path=settings.chroma_path
        )

        self.collection = self.client.get_or_create_collection(
            name=settings.chroma_collection_name
        )

    def query(
            self,
            embedding: list[float],
            top_k: int = 5

    ) -> dict:
        return self.collection.query(
            query_embeddings=embedding,
            n_results=top_k
        )


    def upsert_documents(
        self,
        ids: list[str],
        documents: list[str],
        embeddings: list[list[float]],
        metadatas: list[dict],
    ) -> None:

        self.collection.upsert(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
        )

    def count(self) -> int:
        return self.collection.count()

    def reset_collection(self) -> None:
        self.client.delete_collection(
            name=settings.chroma_collection_name
        )

        self.collection = self.client.get_or_create_collection(
            name=settings.chroma_collection_name
        )