import logging
from pathlib import Path

from llama_index.core import SimpleDirectoryReader

from src.config.settings import settings

logger = logging.getLogger(__name__)


def load_documents():
    """
    Load documents from the configured document directory
    """
    document_path = Path(settings.documents_path)
    if not document_path.exists():
        raise FileNotFoundError(f"Documents Directory not found : {document_path}")

    reader = SimpleDirectoryReader(input_dir=str(document_path), recursive=True)

    documents = reader.load_data()

    logger.info("Documents loaded: %d", len(documents))

    return documents
