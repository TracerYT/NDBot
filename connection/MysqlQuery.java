package org.ndbot.connection;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;

public class MysqlQuery extends MysqlConnection{

    public ResultSet Select(String table, String[] keys, String[] values){
        try {
            Statement stmt = GetConnection().createStatement();
            String sqlQuery = "SELECT * FROM `"+table+"` WHERE `"+String.join("`=? AND ",keys)+"`=?";
            return stmt.executeQuery(sqlQuery);
        }catch(SQLException exc){
            exc.printStackTrace();
        }
        return null;
    }

    public void Insert(String table, String[] keys, String[] values){
        try{
            Statement stmt = GetConnection().createStatement();
            StringBuilder query = new StringBuilder("INSERT INTO `" + table + "` (" + String.join(",", keys) + ") VALUES (");
            for(String ignored : keys) query.append("?,");
            query.append(")");

            stmt.execute(query.toString());
        }catch (SQLException exc){
            exc.printStackTrace();
        }
    }
}
