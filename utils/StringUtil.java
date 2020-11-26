package org.ndbot.utils;

public class StringUtil {
    public static String toUpperFirst(String text){
        char[] temp = text.toLowerCase().toCharArray();
        temp[0] = Character.toUpperCase(temp[0]);
        return String.valueOf(temp);
    }
}
