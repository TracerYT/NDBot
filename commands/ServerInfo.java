package org.ndbot.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.*;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;
import org.ndbot.Settings;
import org.ndbot.utils.Embeds;
import org.ndbot.utils.StringUtil;
import org.ndbot.utils.Time;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class ServerInfo extends ListenerAdapter implements ICommand{
    @Override
    public String getName() {
        return "ServerInfo";
    }

    @Override
    public String getSyntax() {
        return String.format("%s%s", Settings.PREFIX,this.getName());
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
            boolean isCmd = false;
            String[] args = event.getMessage().getContentRaw().split(" ");
            if(!args[0].equalsIgnoreCase(Settings.PREFIX+this.getName())){
                for(String alias : this.getAliases()){
                    if(args[0].equalsIgnoreCase(Settings.PREFIX+alias)) {
                        isCmd = true;
                        break;
                    }
                }
            }else isCmd = true;
            if(!isCmd) return;

            Guild guild = event.getGuild();
            Member member = guild.getMember(event.getAuthor());
            if(member == null) return;

            TextChannel channel = event.getChannel();
            Embeds embeds = new Embeds(event.getJDA());
            EmbedBuilder embed = embeds.getDefaultEmbed();
            List<Role> cachedRoles = guild.getRoles();

            int members = guild.getMembers().size();
            long bots = guild.getMembers().stream().filter(m -> m.getUser().isBot()).count();
            long users = guild.getMembers().stream().filter(m -> !m.getUser().isBot()).count();
            int rolesCount = cachedRoles.size();

            StringBuilder guildRoles = new StringBuilder();
            List<Role> playerRoles = member.getRoles();

            int counter = 0;
            for (Role role: cachedRoles) {
                if(counter == 3) break;
                guildRoles.append(role.getAsMention()).append("\n");
                counter++;
            }

            counter = 0;
            StringBuilder playerTop3 = new StringBuilder();
            for (Role playerRole : playerRoles) {
                if(counter == 3) break;
                playerTop3.append(playerRole.getAsMention()).append("\n");
                counter++;
            }

            String top3Roles = String.format("%s", guildRoles.toString());

            embed.setDescription("Displays informations about server");

            embed.addField("Region", StringUtil.toUpperFirst(guild.getRegionRaw()),true);
            embed.addField("Created",guild.getTimeCreated().format(Time.getFormat()),true);
            embed.addField("Joined",member.getTimeJoined().format(Time.getFormat()),true);

            embed.addField("Members", String.valueOf(members), true);
            embed.addField("Bots", String.valueOf(bots), true);
            embed.addField("Users", String.valueOf(users), true);

            embed.addField("Roles", String.valueOf(rolesCount), true);
            embed.addField("Top 3 roles", top3Roles, true);
            embed.addField("Your top 3 roles", playerTop3.toString(), true);

            embed.addField("Text Channels", String.valueOf(guild.getTextChannels().size()), true);
            embed.addField("Voice Channels", String.valueOf(guild.getVoiceChannels().size()), true);
            embed.addField("Categories", String.valueOf(guild.getCategories().size()), true);

            embed.setAuthor(event.getAuthor().getAsTag());
            embed.setTitle(getName(), String.format(COMMAND_URL, getName(), getName()));
            embed.setThumbnail(guild.getIconUrl());

            channel.sendMessage(embed.build()).queue();
        }
    }
}