import logging
from src.config.settings import settings

from typing import Sequence
from llama_index.core import Document
from llama_index.core.node_parser import SentenceSplitter

logger = logging.getLogger(__name__)


def create_chunks(documents: Sequence[Document]):

    splitter = SentenceSplitter(
        chunk_size=settings.chunk_size, chunk_overlap=settings.chunk_overlap
    )

    nodes = splitter.get_nodes_from_documents(documents=documents)
    logger.info(f"Se han creado {len(nodes)} chunks de los documentos cargados")

    return nodes
