module.exports = {
	name: 'ban',
	description: `Ban a player`,
	execute(message, args) {
		if(!message.author.has()){
                
            return;
        }

        const user = message.mentions.users.first();
        
	},
};