from llama_index.llms.ollama import Ollama
from src.config.settings import settings


def get_llm():
    return Ollama(
        model=settings.llm_model,
        base_url=settings.ollama_base_url,
        context_window=settings.llm_context_window,
        request_timeout=settings.llm_request_timeout,
    )
