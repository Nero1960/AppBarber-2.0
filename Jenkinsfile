pipeline {
    agent any

    tools {
        // Asegúrate de usar los nombres exactos que configuraste en el Paso 2
        jdk 'JDK25'
        maven 'Maven3'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clona el repositorio desde GitHub
                checkout scm
            }
        }

        stage('Prepare Environment Files') {
            steps {
                script {
                    // Mapeamos ambos archivos secretos en una sola llamada a withCredentials
                    withCredentials([
                        file(credentialsId: 'server/.env', variable: 'SERVER_ENV'),
                        file(credentialsId: 'client/.env', variable: 'CLIENT_ENV')
                    ]) {
                // Copiamos cada archivo temporal de Jenkins a su respectiva carpeta en el monorepo
                sh 'cp $SERVER_ENV server/.env'
                sh 'cp $CLIENT_ENV client/.env'
            }
        }
    }
}

        stage('Build & Run Tests (Docker Compose)') {
            steps {
                script {
                    // Como tu app y pruebas usan Docker Compose, 
                    // puedes levantar los servicios y correr las pruebas directamente desde Jenkins
                    sh 'docker compose up -d db server client'
                    
                    // Esperar a que los servicios estén listos y ejecutar el contenedor de pruebas
                    sh 'docker compose run --rm tests'
                }
            }
        }
    }
    
    post {
        always {
            // Limpiar los contenedores al terminar (éxito o fallo)
            sh 'docker compose down -v'
        }
        success {
            echo '¡Las pruebas automatizadas pasaron con éxito!'
        }
        failure {
            echo '¡Las pruebas fallaron. Revisa los logs!'
        }
    }
}