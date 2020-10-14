const { prefix, language } = require("../botconfig.json");
const languageProfiles = require(`../lang/${language}`);
const utilsMessage = require("../utils/message");

module.exports = {
	name: 'kick',
    description: `Kicks a player`,
    usage: `<player> [reason]`,
	execute(message, args) {
        try{
            message.delete({timeout: 1});
            if(!message.member.hasPermission("BAN_MEMBERS")){
                utilsMessage.delete(message, `<@${message.author.id}> ${languageProfiles.noPermissions}`);
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

            let member = message.guild.member(user) || message.guild.members.get(user);

            let reason = args.slice(2).join(" ");
            if(!reason) reason = languageProfiles.noReasonSpecified;

            member.kick(reason)

            message.channel.send(`User **<@${user.id}>** has been kicked. Reason: *__${reason}__*. Banned by <@${message.author.id}>`)
            return;
        }catch(exc){
            console.log("Exception: "+exc);
        }
	},
};