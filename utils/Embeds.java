package org.ndbot.utils;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.JDA;

import java.awt.*;

public class Embeds {
    private static JDA jda;
    public Embeds(JDA jda){
        Embeds.jda = jda;
    }
    public EmbedBuilder getDefaultEmbed(){
        EmbedBuilder builder = new EmbedBuilder();
        builder.setFooter("NDBot "+Time.getCurrentTime(), jda.getSelfUser().getAvatarUrl());
        builder.setColor(new Color(0x8f1fff));

        return builder;
    }
}
