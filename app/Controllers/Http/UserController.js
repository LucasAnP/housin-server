'use strict'

const User = use("App/Models/User");

class UserController {
  async create ({request}){
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async show ({params, auth}){
    const user = await User.query().where('id',params.id).with('properties').with('matchesProperties').with('userQualities').fetch()

    return user;
  }


}

module.exports = UserController
