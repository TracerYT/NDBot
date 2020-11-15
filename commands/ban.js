const { prefix, language } = require("../botconfig.json");
const languageProfiles = require(`../lang/${language}`);
const utilsMessage = require("../utils/message");

module.exports = {
	name: 'ban',
    description: `Ban a player`,
    aliases: [],
    usage: `<player> [reason]`,
	execute(message, args) {
        message.delete({timeout: 1});
		if(!message.member.hasPermission("BAN_MEMBERS")){
            utilsMessage.delete(message,`<@${message.author.id}> ${languageProfiles.noPermissions}`);
            return;
        }
        
        if(args.length <= 0){
            utilsMessage.delete(message,
                `<@${message.author.id}> ${languageProfiles.correctUsage}: *__${prefix}${this.name} ${this.usage}__*`);
            return;
        }

        let user = message.mentions.users.first();
        if(!user){
            utilsMessage.delete(message, `<@${message.author.id}> ${languageProfiles.noUserFound}`);
            return;
        }

        if(user == message.author){
            utilsMessage.delete(message, `<@${message.author.id}> ${languageProfiles.cantDoThisToYourself}`);
            return;
        }

        let member = message.guild.members.fetch(user.id) || message.guild.members.cache.get(user);

        let reason = args.slice(2).join(" ");
        if(!reason) reason = languageProfiles.noReasonSpecified;

        member.ban({
            days: 7,
            reason: reason
        });

        message.channel.send(`User **<@${user.id}>** has been banned. Reason: *__${reason}__*. Banned by <@${message.author.id}>`)
        return;
	},
};