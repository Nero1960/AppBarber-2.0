pipeline {
    agent any

    environment {
        // Proyecto aislado de CI: evita colisionar con el stack local
        // (nombres de contenedores, red y volúmenes propios de appbarber_ci).
        COMPOSE_PROJECT = 'appbarber_ci'
    }

    stages {
        stage('Limpieza previa') {
            steps {
                // Idempotente: elimina contenedores/red residuales de builds anteriores
                sh 'docker compose -p $COMPOSE_PROJECT down --remove-orphans || true'
            }
        }

        stage('Preparar entorno') {
            steps {
                script {
                    // server/.env es requerido por env_file de compose y no está versionado.
                    // Se sobrescribe SIEMPRE desde la credencial para que cada build sea
                    // determinista (evita que un .env viejo del workspace quede obsoleto).
                    withCredentials([string(credentialsId: 'APPBARBER_SERVER_ENV', variable: 'SERVER_ENV_CONTENT')]) {
                        writeFile file: 'server/.env', text: SERVER_ENV_CONTENT
                    }
                }
            }
        }

        stage('Levantar stack') {
            steps {
                sh 'docker compose -p $COMPOSE_PROJECT up -d --build db server client'
                sh 'docker compose -p $COMPOSE_PROJECT ps -a || true'
            }
        }

        stage('Ejecutar tests') {
            steps {
                sh 'docker compose -p $COMPOSE_PROJECT run --rm tests'
            }
        }
    }

    post {
        always {
            script {
                // Evidencia: volcar logs de todos los contenedores ANTES de la limpieza.
                // docker compose logs funciona también sobre contenedores detenidos.
                sh 'docker compose -p $COMPOSE_PROJECT logs --no-color --tail 300 > appbarber-ci-containers.log 2>&1 || true'
                sh 'cat appbarber-ci-containers.log || true'
            }
            archiveArtifacts artifacts: 'appbarber-ci-containers.log', allowEmptyArchive: true

            // Limpieza sin -v: conserva appbarber_ci_db_data con las precondiciones (usuarios, tokens)
            sh 'docker compose -p $COMPOSE_PROJECT down --remove-orphans || true'
        }
    }
}
