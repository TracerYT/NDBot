const { prefix, language } = require("../botconfig.json");

const languageProfiles = require(`../lang/${language}`);

module.exports = {
	name: 'ban',
    description: `Ban a player`,
    usage: `<player> [reason]`,
	execute(message, args) {
		if(!message.member.hasPermission("BAN_MEMBERS")){
            message.channel.send(languageProfiles.noPermissions).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`${languageProfiles.errorOccured}: ${exc}`)
            });
            return;
        }
        
        if(args.length <= 0){
            message.channel.send(`${languageProfiles.correctUsage}: *__${prefix}${this.name} ${this.usage}__*`).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`${languageProfiles.errorOccured}: ${exc}`)
            });
            return;
        }

        let user = message.mentions.users.first();
        if(!user){
            message.channel.send(languageProfiles.noUserFound).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`${languageProfiles.errorOccured}: ${exc}`)
            });
            return;
        }

        let member = message.guild.member(user) || message.guild.members.get(user);

        let reason = args.slice(2).join(" ");
        if(!reason){
            reason = languageProfiles.noReasonSpecified;
            member.ban({
                days: 365000,
                reason: reason
            });
        }else{
            member.ban({
                days: 365000,
                reason: reason
            });
        }
        message.channel.send(`User **__${user.tag}__** has been banned. Reason: *__${reason}__*`)
        return;
	},
};