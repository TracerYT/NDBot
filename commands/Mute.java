package org.ndbot.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;
import org.ndbot.Settings;
import org.ndbot.utils.Embeds;
import org.ndbot.utils.Message;
import org.ndbot.utils.StringUtil;
import org.ndbot.utils.Time;

public class Mute extends ListenerAdapter implements ICommand{
    @Override
    public String getName() {
        return "Mute";
    }

    @Override
    public String getSyntax() {
        return String.format("%s%s <user> [reason]", Settings.PREFIX,this.getName());
    }

    @Override
    public String[] getAliases() {
        return new String[]{};
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
            }else isCmd = true;
            if(!isCmd) return;

            Guild guild = event.getGuild();
            TextChannel channel = event.getChannel();

            Embeds embeds = new Embeds(event.getJDA());
            EmbedBuilder embed = embeds.getDefaultEmbed();

            StringBuilder reason;
            if (args.length == 1){
                Message.error("noArgsProvided", embed);
                channel.sendMessage(embed.build()).queue();
                return;
            }else if(args.length == 2){
                reason = new StringBuilder("No reason specified");
            }else if(args.length == 3){
                reason = new StringBuilder();
                for(int i=1;i<args.length; i++) reason.append(args[i]);
            }else{
                Message.error("invalidSyntax", embed);
                channel.sendMessage(embed.build()).queue();
                return;
            }
            channel.sendMessage(reason.toString()).queue();
        }
    }
}
