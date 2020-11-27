package org.ndbot;

import net.dv8tion.jda.api.JDA;
import org.ndbot.commands.*;

public class CommandHandler {
    private final JDA jda;
    public CommandHandler(JDA jda){
        this.jda = jda;
    }

    public void registerCommands(){
        jda.addEventListener(new ServerInfo());
        jda.addEventListener(new UserInfo());
        jda.addEventListener(new Mute());
    }
}
