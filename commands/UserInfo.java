package org.ndbot.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.Role;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;
import org.ndbot.Settings;
import org.ndbot.connection.MysqlQuery;
import org.ndbot.utils.Embeds;
import org.ndbot.utils.Message;
import org.ndbot.utils.Time;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserInfo extends ListenerAdapter implements ICommand{
    @Override
    public String getName() {
        return "UserInfo";
    }

    @Override
    public String getSyntax() {
        return String.format("%s%s <user>",Settings.PREFIX,this.getName());
    }

    @Override
    public String[] getAliases() {
        return new String[]{
                "ui",
                "useri",
                "uinfo"
        };
    }

    @Override
    public void onGuildMessageReceived(@NotNull GuildMessageReceivedEvent event) {
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
            }
            if(!isCmd) return;

            Guild guild = event.getGuild();
            Member member = guild.getMember(event.getAuthor());
            if(member == null) return;

            TextChannel channel = event.getChannel();
            Embeds embeds = new Embeds(event.getJDA());
            EmbedBuilder embed = embeds.getDefaultEmbed();
            Member target;

            if(args.length == 1) {
                target = member;
            }else if(args.length == 2){
                target = guild.getMemberById(args[1]);
                if(target == null){
                    channel.sendMessage(Message.errors.get("invalidMention")).queue();
                    return;
                }
            }else{
                channel.sendMessage(String.format(Message.errors.get("invalidSyntax"), this.getSyntax())).queue();
                return;
            }

            MysqlQuery query = new MysqlQuery();
            ResultSet res = query.Select("penalties",new String[]{"userid"},new String[]{target.getId()});
            try {
                while(res.next()) {
                    channel.sendMessage(res.getString(0)).queue();
                    channel.sendMessage(res.getString(1)).queue();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }

            StringBuilder roles = new StringBuilder();
            for(Role role :target.getRoles()){
                roles.append(role.getAsMention()).append(" ");
            }
            embed.setDescription("Displays informations about user");

            embed.addField("Created account", target.getTimeCreated().format(Time.getFormat()), true);
            embed.addField("Joined server", target.getTimeJoined().format(Time.getFormat()), true);
            embed.addBlankField(true);

            embed.addField("Roles", roles.toString(), true);

            embed.addField("","",true);

            embed.setAuthor(event.getAuthor().getAsTag());
            embed.setTitle(getName(), String.format(COMMAND_URL, getName(), getName()));
            embed.setThumbnail(guild.getIconUrl());

            channel.sendMessage(embed.build()).queue();
        }
    }
}
