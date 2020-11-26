package org.ndbot.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Time {
    private static final String FORMAT = "dd.MM.yyyy HH:mm:ss";
    public static String getCurrentTime(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern(FORMAT);
        LocalDateTime now = LocalDateTime.now();
        return dtf.format(now);
    }
    public static DateTimeFormatter getFormat(){
        return DateTimeFormatter.ofPattern(FORMAT);
    }
}
