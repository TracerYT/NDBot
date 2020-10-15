const { defaultData, sortRoles } = require("../utils/embed");
const { fUpper } = require("../utils/message");
const { formatDate, dateDiff } = require("../utils/time");

module.exports = {
	name: 'userinfo',
	description: `Check full user's info`,
	aliases: ["ui", "useri", "uinfo"],
	usage: "",
	execute(message, args, bot) {
		let user = message.mentions.users.first();
		let sorted = sortRoles(message.member.roles, 3);
		let data = defaultData(bot);

		data.title = fUpper(this.name);
		(!user) ?
			data.description = "Here is the full info of current user"
		:
			data.description = "Here is the full info of specified user";

		data.url = `https://github.com/TracerYT/NDBot/blob/master/.github_commands/${this.name}/${this.name}.md`;

		if(!user) user = message.author;
		let member = message.guild.member(user);		

		data.thumbnail = { "url": user.avatarURL() };
		data.author = {
			"name": user.username,
			"url": user.displayAvatarURL(),
			"icon_url": user.displayAvatarURL(), 
		};

		let statusPresence = "";
		switch(member.presence.status){
			case "online":
				statusPresence = "🟢 Online"
				break;
			case "idle":
				statusPresence = "🟡 Idle"
				break;
			case "offline":
				statusPresence = "⚪ Offline"
				break;
			case "dnd":
				statusPresence = "🔴 Do not disturb"
				break;
		}

		data.fields = [
			{
				"name": "Created account on",
				"value": `${formatDate(user.createdAt)} (${dateDiff(user.createdAt)} days ago)`,
				"inline": true
			},
			{
				"name": "Joined Server on",
				"value": `${formatDate(member.joinedAt)} (${dateDiff(member.joinedAt)} days ago)`,
				"inline": true
			},
			{
				"name": "Status",
				"value": statusPresence,
				"inline": true
			},
			{
				"name": "ID",
				"value": member.id,
				"inline": true
			},
			{
				"name": "Roles",
				"value": sorted,
				"inline": true
			},
		]

		message.channel.send({embed: data});
	},
};