from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # --------------------
    # OLLAMA
    # --------------------
    ollama_base_url: str = "http://localhost:11434"
    llm_model: str = "qwen3:4b-instruct"
    embedding_model: str = "nomic-embed-text"

    # --------------------
    # LLM
    # --------------------
    llm_request_timeout: float = 120.0
    llm_context_window: int = 8192

    # --------------------
    # RAG
    # --------------------
    chunk_size: int = 320
    chunk_overlap: int = 50
    similarity_top_k: int = 5

    # --------------------
    # Chroma DB
    # --------------------
    chroma_path: str = "storage/chroma_db"
    chroma_collection_name: str = "appbarber_documents"

    # --------------------
    # Documents
    # --------------------
    documents_path: str = "data/documents"

    # =========================
    # Environment
    # =========================

    environment: str = "development"

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=False
    )


settings = Settings()
