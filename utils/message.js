const { language } = require("../botconfig.json");
const languageProfiles = require(`../lang/${language}`);

module.exports = {
    delete(message, text){
        message.channel.send(text)
        .then(msg => {
            msg.delete({timeout: 5 * 1000});
        }).catch(exc => {
            console.log(`${languageProfiles.errorOccured}: ${exc}`)
        });

        return;
    },
    fUpper(text){
        let slicedMessage = text.slice(1);
        return text[0].toUpperCase()+slicedMessage;
    }
}