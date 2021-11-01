'use strict'

const PropertyController = require("./PropertyController");

const User = use("App/Models/User");

class UserController {
  async create ({request}){
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async show ({params}){
    const user = await User.query().where('id',params.id).with('properties').fetch()
    return user;
  }
}

module.exports = UserController
