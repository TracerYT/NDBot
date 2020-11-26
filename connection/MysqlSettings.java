package org.ndbot.connection;

import java.sql.Connection;

public abstract class MysqlSettings {
    protected final String URL = "jdbc:mysql://%s:%d/%s";
    protected final String HOST = "localhost";
    protected final int PORT = 3306;
    protected final String USERNAME = "root";
    protected final String PASSWORD = "";
    protected final String DATABASE_NAME = "";

    protected Connection CONNECTION;
}
