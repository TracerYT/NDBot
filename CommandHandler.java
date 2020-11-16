package org.ndbot;

import net.dv8tion.jda.api.JDA;
import org.ndbot.commands.ServerInfo;

public class CommandHandler {
    private JDA jda;
    public CommandHandler(JDA jda){
        this.jda = jda;
    }

    public void registerCommands(){
        jda.addEventListener(new ServerInfo());
    }
}
