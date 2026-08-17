FROM maven:3.9-eclipse-temurin-25-noble

WORKDIR /app

COPY pom.xml .
RUN mvn -B -q -DskipTests dependency:go-offline

COPY src ./src
COPY testng.xml .

RUN mvn -B -q -DskipTests test-compile

# Dependencias del sistema para Chromium en Ubuntu 24.04 (Noble).
# No usamos "install --with-deps": el driver de Playwright 1.44.0 solo
# conoce listas de Ubuntu <= 22.04 (p.ej. libasound2 ya no existe en Noble).
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libasound2t64 \
        libatk-bridge2.0-0 \
        libatk1.0-0 \
        libatspi2.0-0 \
        libcairo2 \
        libcups2 \
        libdbus-1-3 \
        libdrm2 \
        libegl1 \
        libgbm1 \
        libgl1 \
        libglib2.0-0 \
        libnspr4 \
        libnss3 \
        libpango-1.0-0 \
        libx11-6 \
        libx11-xcb1 \
        libxcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxkbcommon0 \
        libxrandr2 \
        libxrender1 \
        libxshmfence1 \
        libxtst6 \
        fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

RUN mvn -B exec:java -Dexec.mainClass=com.microsoft.playwright.CLI \
    -Dexec.args="install chromium"

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV CI=true

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["mvn", "-B", "test", "-Dsurefire.suiteXmlFiles=testng.xml"]
