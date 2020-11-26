package org.ndbot.connection;

import org.ndbot.Console;

import java.sql.*;

public class MysqlConnection extends MysqlSettings{
    public MysqlConnection(){
        if(super.CONNECTION == null)
            this.Connect();
    }

    private void Connect(){
        try{
            Class.forName("com.mysql.jdbc.Driver");
            super.CONNECTION = DriverManager.getConnection(String.format(super.URL,super.HOST, super.PORT, super.DATABASE_NAME),super.USERNAME, super.PASSWORD);
            Console.send("MySQL connection established successfully!");
        }catch(SQLException | ClassNotFoundException exc){
            exc.printStackTrace();
        }
    }

    public Connection GetConnection(){
        return super.CONNECTION;
    }

    public void CloseConnection() {
        try {
            super.CONNECTION.close();
        }catch(SQLException exc){
            exc.printStackTrace();
        }
    }
}
