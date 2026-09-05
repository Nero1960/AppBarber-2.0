from src.rag.pipeline import ask


def main():

    question = "¿Cuánto cuesta el corte infantil?"

    print("\n================================")
    print("RAG PIPELINE TEST")
    print("================================")

    print(f"\nQuestion: {question}")

    response = ask(
        question=question,
        top_k=5,
    )

    print("\nAnswer:")
    print(response["answer"])

    print("\nSources:")

    for source in response["sources"]:
        print(
            f"- {source['file_name']} "
            f"(page {source['page']})"
        )


if __name__ == "__main__":
    main()