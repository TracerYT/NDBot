const { prefix, language } = require("../botconfig.json");

const langProfiles = require(`../lang/${language}.json`);

module.exports = {
    name: 'message',
	description: `OnMessage Event`,
	execute(message, bot) {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!bot.commands.has(command)){
            message.reply(langProfiles.noCommandFound);
            return;
        }

        try {
            bot.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply(langProfiles.errorCommand);
        }
	}
}