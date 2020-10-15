const { Client, Collection } = require('discord.js');
const bot = new Client();
const fs = require('fs');
const database = require("./database/connection");

require('dotenv').config();

//database.connect();

bot.commands = new Collection();
bot.aliases = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try{
        const command = require(`./commands/${file}`);
        bot.commands.set(command.name, command);
        command.aliases.forEach(alias => {
            bot.aliases.set(alias, command);
        });
        console.log(`Command '${command.name}' has been activated!`);
    }catch(exc){
        console.log(`An error occured: ${exc}`);
    }
}

for(const file of eventFiles) {
    try{
        const event = require(`./events/${file}`);
        bot.on(`${event.name}`, message => event.execute(message, bot));
        console.log(`Event '${event.name}' has been activated!`);
    }catch(exc){
        console.log(`An error occured: ${exc}`);
    }
}

console.log("Bot has been started!");

bot.login(process.env.TOKEN);