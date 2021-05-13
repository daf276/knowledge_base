const { sanitizeEntity } = require('strapi-utils');

module.exports = {
	async findOne(ctx) {
    const { title } = ctx.params;
	var regex = /\!\[.*?\]\((http || www)(.*?)(\.mp4)\)/; //Regex to match mp4 files in the markup
    const entity = await strapi.services.article.findOne({ title });


    if(entity && entity.sections){
		entity.sections.forEach(function (section) {
    		section.content = section.content.replace('(/', `(${strapi.config.get('server.url')}/`); //Prepend server url to local urls
		    section.content = section.content.replace(regex, "<video src='$1$2$3' controls/>"); //Make it so .mp4 gets displayed embedded in a html video tag
    	});
    }
    
    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};