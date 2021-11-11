'use strict'

const UserQuality = use("App/Models/UserQuality")

class UserQualityController {
  async create ({request, params}){
    const userId = params.id;

    const {organized, smoke, drink, responsable, animals} = request.all();
    console.log('Qualities',organized, smoke, drink, responsable, animals);

    const userQualities = await UserQuality.create({user_id:userId, organized, smoke, drink, responsable, animals})
    return userQualities
  }
}

module.exports = UserQualityController
