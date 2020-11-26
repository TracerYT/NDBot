package org.ndbot.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.*;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;
import org.ndbot.Settings;
import org.ndbot.utils.Embeds;

import java.awt.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ListIterator;
import java.util.stream.Stream;

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
            Guild guild = event.getGuild();
            TextChannel channel = event.getChannel();
            Embeds embeds = new Embeds(event.getJDA());
            EmbedBuilder embed = embeds.getDefaultEmbed();
            int members = guild.getMembers().size();
            long bots = guild.getMembers().stream().filter(m -> m.getUser().isBot()).count();
            long users = guild.getMembers().stream().filter(m -> !m.getUser().isBot()).count();
            List<Role> cachedRoles = guild.getRoles();
            int rolesCount = cachedRoles.size();

            List<Role> roles = new ArrayList<>();
            channel.sendMessage(String.valueOf(rolesCount)).queue();
            for (Role role: cachedRoles) {
                if(role.getPosition() == rolesCount - 3){
                    channel.sendMessage(role.getName()).queue();
                    roles.add(role);
                }
            }

            embed.setDescription("Displays informations about server");
            embed.addField("Members", String.valueOf(members), true);
            embed.addField("Bots", String.valueOf(bots), true);
            embed.addField("Users", String.valueOf(users), true);

            embed.addField("Roles", String.format("%s %s %s", roles.get(0),roles.get(1),roles.get(2)), true);

            embed.setAuthor(event.getAuthor().getAsTag());
            embed.setTitle(getName(), String.format(COMMAND_URL, getName(), getName()));

            channel.sendMessage(embed.build()).queue();
        }
    }
}