package org.ndbot.connection;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MysqlQuery extends MysqlConnection{

    public void Select(String table, String[] keys, String[] values){
        try {
            Statement stmt = GetConnection().createStatement();
            ResultSet result = stmt.executeQuery("SELECT * FROM `"+table+"` WHERE `"+String.join("`=? AND ",keys)+"`=?");
        }catch(SQLException exc){
            exc.printStackTrace();
        }
    }
}
