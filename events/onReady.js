const { language } = require("../botconfig.json");

const languageProfiles = require(`../lang/${language}.json`);

module.exports = {
    name: 'ready',
	description: `OnReady Event`,
	execute(_, bot) {
		bot.user.setPresence({
			activity: languageProfiles.watchingProfile,
				type: "WATCHING",
			}, "online");
	}
}