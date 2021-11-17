'use strict'

const User = use("App/Models/User");
const Database = use("Database");

class UserController {
  async create ({request}){
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async show ({params}){
    const user = await User.query().where('id',params.id).with('properties').with('matchesProperties').with('userQualities').fetch()

    return user;
  }

  async update({params, request}){
    const user = await User.findOrFail(params.id);

    const data = request.only(["username", "email"]);

    user.username = data.username
    user.email = data.email

    await user.save();

    return user;

  }

}

module.exports = UserController
