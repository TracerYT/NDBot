package org.ndbot.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Invite;
import net.dv8tion.jda.api.entities.MessageEmbed;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;
import org.ndbot.Settings;
import org.ndbot.utils.Embeds;

import java.awt.*;
import java.util.Arrays;

public class ServerInfo extends ListenerAdapter implements ICommand{
    @Override
    public String getName() {
        return "ServerInfo";
    }

    @Override
    public String[] getAliases() {
        return new String[]{
                "si",
                "serveri",
                "sinfo"
        };
    }

    @Override
    public void onGuildMessageReceived(@NotNull GuildMessageReceivedEvent event){
        if (onCommand(event)) {
            TextChannel channel = event.getChannel();
            Embeds embeds = new Embeds(event.getJDA());
            EmbedBuilder embed = embeds.getDefaultEmbed();
            embed.setDescription("desc");
            embed.setAuthor(event.getAuthor().getAsTag());
            embed.setTitle(getName(), String.format(COMMAND_URL, getName(), getName()));

            channel.sendMessage(embed.build()).queue();
        }
    }
}