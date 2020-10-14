const { sortRoles } = require("../utils/embed");
const { getCurTime } = require("../utils/time");


module.exports = {
	name: 'serverinfo',
	description: `Check full server's info`,
	execute(message, args, bot) {
		let sorted = sortRoles(message.guild.roles.cache, 3);
		let data = {
			"embed": {
				"title": "Serverinfo",
				"description": "Here is the full info of the current server",
				"url": "", // URL of the title
				"color": 0x4400ff,
				"timestamp": getCurTime,
				"footer": {
					"icon_url": bot.user.displayAvatarURL(),
					"text": bot.user.username
				},
				"thumbnail": {
					"url": message.guild.iconURL()
				},
				"image": {
					"url": undefined
				},
				"author": {
					"name": message.author.username,
					"url": message.author.displayAvatarURL(),
					"icon_url": message.author.displayAvatarURL(),
				},
				"fields": [
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
			}
		}
		message.channel.send(data);
	},
};