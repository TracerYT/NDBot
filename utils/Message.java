package org.ndbot.utils;

import java.util.HashMap;

public class Message {
    public static HashMap<String,String> errors = new HashMap<>();
    public static HashMap<String,String> warnings = new HashMap<>();
    public static HashMap<String,String> infos = new HashMap<>();

    public static void __init(){
        errors.put("invalidSyntax", "**Error:** Invalid form of command. Correct syntax: __%s__");
        errors.put("invalidMention", "**Error:** Invalid user mention");
    }
}
