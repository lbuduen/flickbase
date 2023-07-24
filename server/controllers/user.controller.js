const httpStatus = require("http-status");
const { userService, authService, emailService } = require("../services");

const UserController = {
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).send("User not found");
      }
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).send("User not found");
      }
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async updateUserEmail(req, res, next) {
    try {
      const user = await userService.updateUserEmail(req);

      const token = authService.genAuthToken(user);

      await emailService.registerEmail(user.email, user);

      res
        .cookie("x-access-token", token)
        .send({ user: res.locals.permission.filter(user._doc), token });
    } catch (error) {
      res.status(httpStatus.NOT_FOUND).send(error.message);
      next();
    }
  },
  async verifyAccount(req, res, next) {
    try {
      const token = userService.validateToken(req.query.token);
      const user = await userService.findUserById(token.sub);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).send("User not foudn");
      }
      if (user.verified) {
        return res.status(httpStatus.NOT_FOUND).send("Already verified");
      }
      user.verified = true;
      user.save();
      res
        .status(httpStatus.CREATED)
        .send({ email: user.email, verified: true });
    } catch (error) {
      res.status(httpStatus.NOT_FOUND).send(error.message);
      next();
    }
  },
};

module.exports = UserController;
