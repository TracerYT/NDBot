const { prefix, language } = require("../botconfig.json");

const languageProfiles = require(`../lang/${language}`);

module.exports = {
	name: 'purge',
    description: `Clears the chat`,
    usage: `<amount>`,
	execute(message, args) {
        message.delete();
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            message.channel.send(`<@${message.author.id}> ${languageProfiles.noPermissions}`).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`${languageProfiles.errorOccured}: ${exc}`)
            });
            return;
        }
        
        if(args.length <= 0 || args.length > 1){
            message.channel.send(`<@${message.author.id}> ${languageProfiles.correctUsage}: *__${prefix}${this.name} ${this.usage}__*`).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`${languageProfiles.errorOccured}: ${exc}`)
            });
            return;
        }

        let amount = parseInt(args[0]);
        if(amount > 100) amount = 100;

        try{
            message.channel.messages.fetch({ limit: amount })
            .then(msg => {
                message.channel.bulkDelete(msg)
            });

            message.channel.send(`Purged ${amount} messages!`).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`${languageProfiles.errorOccured}: ${exc}`)
            });
        }catch(exc){
            console.log(`${languageProfiles.errorOccured}: ${exc}`)
        }
        return;
    }
}