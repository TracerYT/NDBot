package org.ndbot.utils;

import net.dv8tion.jda.api.EmbedBuilder;

import java.util.HashMap;

public class Message {
    public static HashMap<String,String> errors = new HashMap<>();
    public static HashMap<String,String> warnings = new HashMap<>();
    public static HashMap<String,String> infos = new HashMap<>();

    public static void __init(){
        errors.put("invalidSyntax", "Error: Invalid form of command! Correct syntax: __%s__");
        errors.put("invalidMention", "Error: Invalid user mention!");
        errors.put("noArgsProvided", "Error: No arguments specified!");
    }

    public static void error(String type, EmbedBuilder embed){
        embed.setTitle("`"+errors.get(type)+"`");
    }
}
