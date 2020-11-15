const { sortRoles, defaultData } = require("../utils/embed");
const { fUpper } = require("../utils/message");

module.exports = {
	name: 'serverinfo',
	description: `Check full server's info`,
	aliases: ["si", "serveri", "sinfo"],
	usage: "",
	execute(message, args, bot) {
		let sorted = sortRoles(message.guild.roles, 3);
		let data = defaultData(bot);

		data.title = fUpper(this.name);
		data.description = "Here is the full info of the current server";
		data.url = `https://github.com/TracerYT/NDBot/blob/javascript/.github_commands/${this.name}/${this.name}.md`;

		data.fields = [
			{
				"name": "Members",
				"value": message.guild.memberCount,
				"inline": true
			},
			{
				"name": "Bots",
				"value": message.guild.members.cache.filter(member => member.user.bot).size,
				"inline": true
			},
			{
				"name": "Users",
				"value": message.guild.members.cache.filter(member => !member.user.bot).size,
				"inline": true
			},
			{
				"name": "Text Channels",
				"value": message.guild.channels.cache.filter(channel => channel.type === "text").size,
				"inline": true
			},
			{
				"name": "Voice Channels",
				"value": message.guild.channels.cache.filter(channel => channel.type === "voice").size,
				"inline": true
			},
			{
				"name": "Categories",
				"value": message.guild.channels.cache.filter(channel => channel.type === "category").size,
				"inline": true
			},
			{
				"name": "Roles count",
				"value": message.guild.roles.cache.size,
				"inline": true
			},
			{
				"name": "Top highest roles",
				"value": `${sorted[0]}, ${sorted[1]}, ${sorted[2]}`,
				"inline": true
			},
		]

		message.channel.send({embed: data});
	},
};
