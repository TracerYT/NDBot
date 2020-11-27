package org.ndbot;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.requests.GatewayIntent;
import org.ndbot.connection.MysqlConnection;
import org.ndbot.utils.Message;

import javax.security.auth.login.LoginException;
import java.util.Collection;
import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;

public class NDBot {
    private static final MysqlConnection mysql = new MysqlConnection();
    private static JDA jda;
    public static NDBot instance;
    private NDBot(){instance = this;}

    public static void main(String[] args) {
        Message.__init();
        new NDBot();
        instance.enableBot();

        CommandHandler handler = new CommandHandler(jda);
        handler.registerCommands();
    }

    public NDBot getInstance(){
        return instance;
    }

    private void enableBot() {
        try {
            jda = JDABuilder.createDefault(Settings.TOKEN).build();
        }catch (LoginException exc){
            exc.printStackTrace();
        }
    }

    private void disableBot(){
        jda = null;
        mysql.CloseConnection();
    }
}
