const { getCurTime } = require("../utils/time");

module.exports = {
    sortRoles(roles, amount){
        const sortedRoles = roles.cache.sorted((role1, role2) => role2.position - role1.position);
        let sortedArr = sortedRoles.first(amount);
        console.log(sortedArr);
        for(let i=0; i<amount; i++){
            if(sortedArr[i] && sortedArr[i].id === "759367145486024754"){
                sortedArr[i] = undefined;
            }
        }

        return sortedArr;
    },
    defaultData(bot){
        return {
			"embed": {
                "title": undefined,
                "description": undefined,
                "url": undefined,
                "thumbnail": undefined,
                "author": undefined,
				"color": 0x4400ff,
				"timestamp": getCurTime,
				"footer": {
					"icon_url": bot.user.displayAvatarURL(),
					"text": bot.user.username
                },
                "fields": []
			}
        };
    }
}