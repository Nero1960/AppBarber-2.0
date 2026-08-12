pipeline {
    agent any

    tools {
        jdk 'JDK25'
        maven 'Maven3'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Environment Files') {
            steps {
                script {
                    withCredentials([
                        file(credentialsId: 'server/.env', variable: 'SERVER_ENV'),
                        file(credentialsId: 'client/.env', variable: 'CLIENT_ENV')
                    ]) {
                        sh 'cp $SERVER_ENV server/.env'
                        sh 'cp $CLIENT_ENV client/.env'
                    }
                }
            }
        }

        stage('Clean Old Containers') {
            steps {
                script {
                    // Limpia contenedores huérfanos o nombres repetidos antes de arrancar
                    sh 'docker compose down --remove-orphans || true'
                }
            }
        }

        stage('Build & Run Tests (Docker Compose)') {
    steps {
        script {
            try {
                sh 'docker compose --profile tests up -d db server client'
                sh 'docker compose --profile tests run --rm tests'
            } catch (Exception e) {
                // Si algo falla, imprime los logs del servidor para ver el error exacto
                sh 'docker compose --profile tests logs server'
                throw e
            }
        }
    }
}
}
    }
    
    post {
        always {
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