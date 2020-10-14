const { prefix, language } = require("../botconfig.json");
const languageProfiles = require(`../lang/${language}`);
const utilsMessage = require("../utils/message");

module.exports = {
	name: 'purge',
    description: `Clears the chat`,
    usage: `<amount>`,
	execute(message, args) {
        message.delete();
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            utilsMessage.delete(message, `<@${message.author.id}> ${languageProfiles.noPermissions}`);
            return;
        }
        
        if(args.length <= 0 || args.length > 1){
            utilsMessage.delete(message,
                `<@${message.author.id}> ${languageProfiles.correctUsage}: *__${prefix}${this.name} ${this.usage}__*`);
            return;
        }

        let amount = parseInt(args[0]);
        if(amount > 100) amount = 100;

        message.channel.messages.fetch({ limit: amount })
        .then(msg => {
            message.channel.bulkDelete(msg)
        }).catch(exc => {
            console.log(`${languageProfiles.errorOccured}: ${exc}`);
        })

        utilsMessage.delete(message, `Purged ${amount} messages!`);

        return;
    }
}