const { sanitizeEntity } = require('strapi-utils');

module.exports = {
	async findOne(ctx) {
    const { title } = ctx.params;

    const entity = await strapi.services.category.findOne({ title });
    return sanitizeEntity(entity, { model: strapi.models.category });
  },
};
