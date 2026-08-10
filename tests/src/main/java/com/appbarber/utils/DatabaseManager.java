package com.appbarber.utils;

import java.sql.*;

public class DatabaseManager {

    private static final String SELECT_LATEST_TOKEN_BY_EMAIL = "SELECT t.token " +
            "FROM user u " +
            "INNER JOIN token t ON u.userId = t.userId " +
            "WHERE u.email = ? " +
            "ORDER BY t.tokenId DESC LIMIT 1";

    /**
     * Obtiene la conexión activa con MySQL usando la URL armada en ConfigManager.
     */
    private static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
                ConfigManager.getDbUrl(),
                ConfigManager.getDbUser(),
                ConfigManager.getDbPassword()
        );
    }

    public static String getLatestTokenByEmail(String email) {
        String query = SELECT_LATEST_TOKEN_BY_EMAIL;

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, email);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getString("token");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // 👇 ESTO ES VITAL PARA VER QUÉ LE DUELE A MYSQL 👇
            throw new RuntimeException("Error al ejecutar la consulta SQL en la BD: " + ConfigManager.getDbName(), e);
        }

        throw new RuntimeException("No se encontró ningún token para el usuario: " + email);
    }

    public static String getAccountConfirmationToken(String email){
        return  getLatestTokenByEmail(email);
    }

    public static String getPasswordResetToken(String email){
        return getLatestTokenByEmail(email);
    }

}
