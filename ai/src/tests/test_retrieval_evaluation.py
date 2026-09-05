from src.rag.retrieval.retriever import retrieve


TEST_CASES = [

    # ========================================
    # SERVICES
    # ========================================

    {
        "question": "¿Cuánto cuesta un corte de cabello?",
        "expected_file": "Catalogo_Servicios_Sin_Tabla.pdf",
    },

    {
        "question": "¿Cuánto cuesta un corte Fade?",
        "expected_file": "Catalogo_Servicios_Sin_Tabla.pdf",
    },

    {
        "question": "¿Cuánto cuesta un corte infantil?",
        "expected_file": "Catalogo_Servicios_Sin_Tabla.pdf",
    },

    {
        "question": "¿Cuánto cuesta un afeitado clásico?",
        "expected_file": "Catalogo_Servicios_Sin_Tabla.pdf",
    },

    {
        "question": "¿Cuánto cuesta el servicio de barba completa?",
        "expected_file": "Catalogo_Servicios_Sin_Tabla.pdf",
    },

    {
        "question": "¿Cuánto cuesta el servicio de Corte + Barba?",
        "expected_file": "Catalogo_Servicios_Sin_Tabla.pdf",
    },

    # ========================================
    # BARBERS
    # ========================================

    {
        "question": "¿Quién es especialista en Fades?",
        "expected_file": "Equipo_Barberos_v3.pdf",
    },

    {
        "question": "¿Quién se especializa en cortes para niños?",
        "expected_file": "Equipo_Barberos_v3.pdf",
    },

    {
        "question": "¿Quién es especialista en barba?",
        "expected_file": "Equipo_Barberos_v3.pdf",
    },

    {
        "question": "¿Quién es experto en cortes clásicos?",
        "expected_file": "Equipo_Barberos_v3.pdf",
    },

    # ========================================
    # FAQ
    # ========================================

    {
        "question": "¿Puedo elegir a mi barbero?",
        "expected_file": "faq.pdf",
    },

    {
        "question": "¿Atienden a niños?",
        "expected_file": "faq.pdf",
    },

    {
        "question": "¿Qué métodos de pago aceptan?",
        "expected_file": "faq.pdf",
    },

    {
        "question": "¿Cuánto tiempo antes debo cancelar una cita?",
        "expected_file": "faq.pdf",
    },

    {
        "question": "¿Qué pasa si llego tarde a mi cita?",
        "expected_file": "faq.pdf",
    },

    {
        "question": "¿Necesito reservar una cita?",
        "expected_file": "faq.pdf",
    },

    # ========================================
    # SCHEDULE / CONTACT
    # ========================================

    {
        "question": "¿Cuál es el horario de la barbería?",
        "expected_file": "Horarios_Contacto.pdf",
    },

    {
        "question": "¿Cuál es la dirección de la barbería?",
        "expected_file": "Horarios_Contacto.pdf",
    },

    {
        "question": "¿La barbería abre los domingos?",
        "expected_file": "Horarios_Contacto.pdf",
    },

    {
        "question": "¿Cuál es el teléfono de la barbería?",
        "expected_file": "Horarios_Contacto.pdf",
    },

    {
        "question": "¿Cuál es el correo electrónico de la barbería?",
        "expected_file": "Horarios_Contacto.pdf",
    },

    # ========================================
    # APPOINTMENT POLICY
    # ========================================

    {
        "question": "¿Con cuánta anticipación debo cancelar una cita?",
        "expected_file": "politica_citas.pdf",
    },

    {
        "question": "¿Qué pasa si cancelo una cita con menos de 24 horas?",
        "expected_file": "politica_citas.pdf",
    },

    {
        "question": "¿Qué pasa si llego tarde a una cita?",
        "expected_file": "politica_citas.pdf",
    },

    # ========================================
    # HAIR / BEARD CARE
    # ========================================

    {
        "question": "¿Cómo debo cuidar mi barba?",
        "expected_file": "Consejos_Cuidado_v3.pdf",
    },

    {
        "question": "¿Cada cuánto debo cepillar mi barba?",
        "expected_file": "Consejos_Cuidado_v3.pdf",
    },

    {
        "question": "¿Cómo puedo cuidar mi cabello?",
        "expected_file": "Consejos_Cuidado_v3.pdf",
    },

    {
        "question": "¿Qué tipo de shampoo recomiendan?",
        "expected_file": "Consejos_Cuidado_v3.pdf",
    },
]


def evaluate_retrieval(top_k: int = 3):

    total = len(TEST_CASES)

    top_1_correct = 0
    top_k_correct = 0

    print("\n================================")
    print("RETRIEVAL EVALUATION")
    print("================================")

    for index, test_case in enumerate(TEST_CASES, start=1):

        question = test_case["question"]
        expected_file = test_case["expected_file"]

        results = retrieve(
            query=question,
            top_k=top_k,
        )

        # ----------------------------------------
        # Metadata
        # ----------------------------------------

        metadata_results = results.get("metadatas", [[]])[0]

        files = [
            metadata.get("file_name", "unknown")
            for metadata in metadata_results
        ]

        # ----------------------------------------
        # Distances
        # ----------------------------------------

        distance_results = results.get("distances", [[]])[0]

        # Avoid errors if distances are missing
        if len(distance_results) != len(files):
            distance_results = [None] * len(files)

        # ----------------------------------------
        # No results
        # ----------------------------------------

        if not files:

            print(f"\n--- Test {index} ---")
            print(f"Question: {question}")
            print(f"Expected: {expected_file}")
            print("Retrieved: No documents")
            print("Top 1: FAIL")
            print(f"Top {top_k}: FAIL")

            continue

        # ----------------------------------------
        # Evaluation
        # ----------------------------------------

        top_1 = files[0]

        top_1_pass = top_1 == expected_file
        top_k_pass = expected_file in files

        if top_1_pass:
            top_1_correct += 1

        if top_k_pass:
            top_k_correct += 1

        # ----------------------------------------
        # Output
        # ----------------------------------------

        print(f"\n--- Test {index} ---")
        print(f"Question: {question}")
        print(f"Expected: {expected_file}")

        print("Retrieved:")

        for position, (file_name, distance) in enumerate(
            zip(files, distance_results),
            start=1
        ):

            if distance is not None:

                print(
                    f"  {position}. "
                    f"{file_name} | "
                    f"Distance: {distance:.4f}"
                )

            else:

                print(
                    f"  {position}. "
                    f"{file_name} | "
                    f"Distance: N/A"
                )

        print(
            f"Top 1: "
            f"{'PASS' if top_1_pass else 'FAIL'}"
        )

        print(
            f"Top {top_k}: "
            f"{'PASS' if top_k_pass else 'FAIL'}"
        )

    # ========================================
    # METRICS
    # ========================================

    top_1_accuracy = top_1_correct / total
    top_k_accuracy = top_k_correct / total

    print("\n================================")
    print("RESULTS")
    print("================================")

    print(
        f"Top 1 Accuracy: "
        f"{top_1_correct}/{total} "
        f"({top_1_accuracy:.2%})"
    )

    print(
        f"Top {top_k} Accuracy: "
        f"{top_k_correct}/{total} "
        f"({top_k_accuracy:.2%})"
    )


if __name__ == "__main__":
    evaluate_retrieval(top_k=3)