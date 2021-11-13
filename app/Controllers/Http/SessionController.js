"use strict";
const User = use("App/Models/User");
class SessionController {
  async create({ request, auth }) {
    try {
      const { email, password} = request.all();
      const token = await auth.attempt(email, password);
      const user = await User.query().where('email', email).firstOrFail()
      return {userId:user.id, ...token};

    } catch (error) {
      console.warn(error);
    }
  }
}

module.exports = SessionController;
