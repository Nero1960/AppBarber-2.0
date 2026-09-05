from src.rag.generation.llm import get_llm
from src.rag.generation.prompt import SYSTEM_PROMPT

def generate_answer(question: str, context: str) -> str:
    llm = get_llm()

    prompt = f"""
        {SYSTEM_PROMPT}

        Context:
        {context}

        User question:
        {question}

        Answer:
    """

    response = llm.complete(prompt)

    return response

