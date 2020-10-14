module.exports = {
    createEmbed(data){
        const def = {
            "embed": {
                "title": data.embed.title,
                "description": data.embed.description,
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
        return def;
    }
}