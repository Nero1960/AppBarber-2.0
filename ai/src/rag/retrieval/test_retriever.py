from src.rag.retrieval.retriever import retrieve


def main():
    query = "¿Cuánto vale el corte infantil?"

    results = retrieve(
        query=query,
        top_k=5,
    )

    print("\n================================")
    print("RETRIEVER TEST")
    print("================================")

    distances = results["distances"][0]
    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    for i, (distance, document, metadata) in enumerate(
        zip(distances, documents, metadatas),
        start=1
    ):
        print(f"\n--- RESULT {i} ---")
        print(f"Distance: {distance}")
        print(f"File: {metadata.get('file_name')}")
        print(f"Page: {metadata.get('page_label')}")
        print("Text:")
        print(document)


if __name__ == "__main__":
    main()