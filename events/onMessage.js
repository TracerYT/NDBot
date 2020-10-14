const { prefix, language } = require("../botconfig.json");

const languageProfiles = require(`../lang/${language}.json`);

module.exports = {
    name: 'message',
	description: `OnMessage Event`,
	execute(message, bot) {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!bot.commands.has(command)){
            message.reply(languageProfiles.noCommandFound);
            return;
        }

        try {
            bot.commands.get(command).execute(message, args, bot);
        } catch (exc) {
            console.log(`${languageProfiles.errorOccured} while trying to activate a command: ${exc}`);
            return;
        }
	}
}