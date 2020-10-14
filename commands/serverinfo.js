const embed = require("../utils/embed");

module.exports = {
	name: 'serverinfo',
	description: `Check full server's info`,
	execute(message, args, _) {
		let data = {
			"embed": {
				"title": "Serverinfo",
				"description": "Here is the full info of the current server",
				"url": data.embed.url,
				"color": data.embed.color,
				"timestamp": data.embed.timestamp,
				"footer": {
					"icon_url": data.embed.footer.icon_url,
					"text": data.embed.footer.text
				},
				"thumbnail": {
					"url": data.embed.thumbnail.url
				},
				"image": {
					"url": data.embed.image.url
				},
				"author": {
					"name": data.embed.author.name,
					"url": data.embed.author.url,
					"icon_url": data.embed.author.icon_url
				},
					"fields": data.embed.fields
				}
		}
		message.channel.send(embed.createEmbed(data));
	},
};