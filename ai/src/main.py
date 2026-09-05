from llama_index.llms.ollama import Ollama


def main():
    llm = Ollama(
        model="qwen3:4b-instruct",
        base_url="http://localhost:11434",
        request_timeout=120,
        context_window=8192,
    )

    response = llm.complete("Explica brevemente que es un RAG en IA")
    print("Respuesta del modelo:", response)


if __name__ == "__main__":
    main()
