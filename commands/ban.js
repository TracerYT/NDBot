const { prefix, language } = require("../botconfig.json");

const languageProfiles = require(`../lang/${language}`);

module.exports = {
	name: 'ban',
    description: `Ban a player`,
    usage: `<player> [reason]`,
	execute(message, args) {
        message.delete({timeout: 1});
		if(!message.member.hasPermission("BAN_MEMBERS")){
            message.channel.send(`<@${message.author.id}> ${languageProfiles.noPermissions}`).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`${languageProfiles.errorOccured}: ${exc}`)
            });
            return;
        }
        
        if(args.length <= 0){
            message.channel.send(`<@${message.author.id}> ${languageProfiles.correctUsage}: *__${prefix}${this.name} ${this.usage}__*`).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`${languageProfiles.errorOccured}: ${exc}`)
            });
            return;
        }

        let user = message.mentions.users.first();
        if(!user){
            message.channel.send(`<@${message.author.id}> ${languageProfiles.noUserFound}`).then(msg => {
                msg.delete({timeout: 5 * 1000});
            }).catch(exc => {
                console.log(`<@${message.author.id}> ${languageProfiles.errorOccured}: ${exc}`)
            });
            return;
        }

        let member = message.guild.member(user) || message.guild.members.get(user);

        let reason = args.slice(2).join(" ");
        if(!reason){
            reason = languageProfiles.noReasonSpecified;
            /*member.ban({
                days: 365000,
                reason: reason
            });*/
        }else{
            member.ban({
                days: 365000,
                reason: reason
            });
        }
        message.channel.send(`User **<@${user.id}>** has been banned. Reason: *__${reason}__*. Banned by <@${message.author.id}>`)
        return;
	},
};