from typing import List
from llama_index.core.schema import BaseNode
from llama_index.embeddings.ollama import OllamaEmbedding
from src.config.settings import settings
from src.config.logging import logging


def create_embedding(nodes: List[BaseNode]) -> List[List[float]]:
    """
    Generate embedding for document chunks
    """

    embed_model = get_embedding_model()

    embeddings = []

    for index, node in enumerate(nodes, start=1):
        embedding = embed_model.get_text_embedding(node.text)

        embeddings.append(embedding)

        logging.info(f"Embedding generated: {index}-{len(nodes)}")

    return embeddings

def get_embedding_model():
    return OllamaEmbedding(
        model_name=settings.embedding_model, base_url=settings.ollama_base_url
    )
