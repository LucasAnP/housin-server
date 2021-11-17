'use strict'

const UserQuality = use("App/Models/UserQuality")
const User = use("App/Models/User");

class UserQualityController {
  async create ({request, params}){
    const userId = params.id;

    const {organized, smoke, drink, responsable, animals} = request.all();

    const userQualities = await UserQuality.create({user_id:userId, organized, smoke, drink, responsable, animals})
    return userQualities
  }

  async update({params, request}){
    const userQualities = await UserQuality.findOrFail(params.id);

    const data = request.only(["organized", "smoke", "drink", "responsable", "animals"]);

    userQualities.merge(data)

    await userQualities.save()

    return userQualities;

  }
}

module.exports = UserQualityController
