"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with properties
 */

// Para ter acesso ao model de imóveis
const Property = use("App/Models/Property");
const Database = use("Database");
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  //Retornando imóveis
  async index({ request, response, auth }) {
    const { id } = auth.user;
    const properties = await Database.raw(
      `select distinct
        p.id, p.title, p.address, p.description, p.address, p.smoke, p.drink, p.organized, p.animals, p.responsable
          from properties p, user_qualities u where (p.smoke = u.smoke)
            or (p.organized = u.organized)
            or (p.drink = u.drink)
            or (p.animals = u.animals)
            or (p.responsable = u.responsable) and u.id = ${id} `
    );

    const propertiesCompability = properties.rows.map((property) => {
      let Suncompatibility = () => {
        let sun = 0;
        if (property.smoke === "1") {
          sun += 20;
        }
        if (property.drink === "1") {
          sun += 20;
        }
        if (property.animals === "1") {
          sun += 20;
        }
        if (property.organized === "1") {
          sun += 20;
        }
        if (property.responsable === "1") {
          sun += 20;
        }
        return sun;
      };
      return {
        ...property,
        compatibility: Suncompatibility(),
      };
    });

    return propertiesCompability;
  }

  /**
   * Render a form to be used for creating a new property.
   * GET properties/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new property.
   * POST properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { id } = auth.user;
    const { title, address, description, qualities } = request.all();
    const { organized, smoke, drink, responsable, animals } = qualities;
    const propertyData = {
      user_id: id,
      title,
      address,
      description,
      organized,
      smoke,
      drink,
      responsable,
      animals,
    };
    const property = await Property.create(propertyData);

    return property;
  }

  /**
   * Display a single property.
   * GET properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const property = await Property.findOrFail(params.id);

    await property.load("images");

    return property;
  }

  /**
   * Render a form to update an existing property.
   * GET properties/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update property details.
   * PUT or PATCH properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    // Retorna erro se a propriedade não existir
    const property = await Property.findOrFail(params.id);

    const data = request.only(["title", "address", "description"]);

    property.merge(data);

    await property.save();

    return property;
  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const property = await Property.findOrFail(params.id);

    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }
    await property.delete;
  }
}

module.exports = PropertyController;
