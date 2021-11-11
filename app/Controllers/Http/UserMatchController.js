"use strict";

const UserMatch = use("App/Models/UserMatch");

class UserMatchController {
  async create({ request, params }) {
    const userId = params.id;

    const {property_id} = request.all();
    const user = await UserMatch.create({ property_id, user_id: userId });

    return user;
  }
}

module.exports = UserMatchController;
