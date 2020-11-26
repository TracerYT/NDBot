package org.ndbot.commands;

import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import org.ndbot.Settings;

public interface ICommand {
    String getName();
    String[] getAliases();
    String COMMAND_URL = "https://github.com/TracerYT/NDBot/blob/java/.git_commands/%s/%s.md";

    default boolean onCommand(GuildMessageReceivedEvent event){
        if(event.getAuthor().isBot() || event.getAuthor().isFake()) return false;

        String[] args = event.getMessage().getContentRaw().split(" ");

        return args[0].startsWith(Settings.PREFIX);
    }
}
