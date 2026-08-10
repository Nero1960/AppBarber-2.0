package com.appbarber.utils;

import java.io.InputStream;
import java.util.Properties;

public class ConfigManager {
    private static final Properties properties = new Properties();

    static {
        try (InputStream input = ConfigManager.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                throw new RuntimeException("No se encontró el archivo config.properties en el classpath");
            }
            properties.load(input);
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar el archivo de configuración config.properties", e);
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    // Prioriza la variable de entorno (ej: USERS_APP_EMAIL para users.app.email)
    // y si no existe usa el valor del archivo config.properties
    public static String getPropertyOrEnv(String key) {
        String envKey = key.replace('.', '_').toUpperCase();
        String envValue = System.getenv(envKey);
        return envValue != null ? envValue : getProperty(key);
    }

    // Obtiene el entorno activo (Da prioridad a -Denv de la terminal, si no usa el del .properties)
    public static String getEnvironment() {
        String systemEnv = System.getProperty("env");
        if (systemEnv != null && !systemEnv.trim().isEmpty()) {
            return systemEnv.trim().toLowerCase();
        }
        return getProperty("env").toLowerCase();
    }

    // Método para la URL de la API según el ambiente
    public static String getApiBaseUrl() {
        String env = getEnvironment();
        String baseUrlKey = "api.base.url." + env;
        String baseUrl = getProperty(baseUrlKey);

        if (baseUrl == null) {
            throw new IllegalArgumentException("No se encontró la URL base de API para el ambiente: " + env);
        }
        return baseUrl;
    }

    // Método para la URL de la UI según el ambiente
    public static String getUiBaseUrl() {
        String env = getEnvironment();
        String baseUrlKey = "ui.base.url." + env;
        String baseUrl = getProperty(baseUrlKey);

        if (baseUrl == null) {
            // Fallback en caso de que solo tengas una URL base de UI estática
            return getProperty("url.base");
        }
        return baseUrl;
    }

    // Método utilitario para obtener timeouts como entero
    public static int getTimeout() {
        String timeout = getProperty("timeout");
        return timeout != null ? Integer.parseInt(timeout) : 5000;
    }

    // --- Métodos para Configuración de BD ---
    public static String getDbHost(){
        String env = getEnvironment();
        String host = getPropertyOrEnv("db.host." + env);
        return host != null ? host : "localhost";
    }

    public static String getDbPort() {
        String env = getEnvironment();
        String port = getPropertyOrEnv("db.port." + env);
        return port != null ? port : "3306";
    }

    public static String getDbName() {
        return getPropertyOrEnv("db.name." + getEnvironment());
    }

    public static String getDbUser() {
        return requireSecret("db.user." + getEnvironment());
    }

    public static String getDbPassword() {
        return requireSecret("db.password." + getEnvironment());
    }

    private static String requireSecret(String key) {
        String value = getPropertyOrEnv(key);
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(
                    "Credencial no configurada: " + key + ". Defina la variable de entorno " +
                            key.replace('.', '_').toUpperCase() + " o el valor en config.properties");
        }
        return value;
    }

    /**
     * Construye la URL de conexión JDBC a partir de los componentes individuales
     */
    public static String getDbUrl() {
        return String.format("jdbc:mysql://%s:%s/%s?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
                getDbHost(),
                getDbPort(),
                getDbName());
    }

}