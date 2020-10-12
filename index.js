const { Client, Collection } = require('discord.js');
const bot = new Client();
const fs = require('fs');

require('dotenv').config();

bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try{
        const command = require(`./commands/${file}`);
        bot.commands.set(command.name, command);
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

bot.login(process.env.TOKEN);