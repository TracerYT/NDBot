const { language } = require("../botconfig.json");

const languageProfiles = require(`../lang/${language}.json`);

module.exports = {
    name: 'ready',
	description: `OnReady Event`,
	execute(_, bot) {
		try{
			bot.user.setPresence({
				activity: {
					name: `${languageProfiles.watchingProfile}`,
					type: "WATCHING",
				}
			}, "online");
		}catch(exc){
			console.log(`${languageProfiles.errorOccured}: ${exc}`);
			return;
		}
	}
}