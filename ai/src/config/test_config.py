from src.config.settings import settings


def main():
    print("=== CONFIGURATION ===")

    print(f"Ollama URL: {settings.ollama_base_url}")
    print(f"LLM: {settings.llm_model}")
    print(f"Embeddings: {settings.embedding_model}")

    print(f"Chunk size: {settings.chunk_size}")
    print(f"Chunk overlap: {settings.chunk_overlap}")
    print(f"Top K: {settings.similarity_top_k}")

    print(f"Chroma path: {settings.chroma_path}")
    print(f"Collection: {settings.chroma_collection_name}")


if __name__ == "__main__":
    main()
