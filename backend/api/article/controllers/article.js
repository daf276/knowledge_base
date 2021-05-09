const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findTitle(ctx) {
    const { title } = ctx.params;

    const entity = await strapi.services.restaurant.findOne({ title });
    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};