import { CookieOptions, NextFunction, Request, Response } from "express";
import HttpException from "../../exception/HttpException";
import UserNotFoundException from "../../exception/UserNotFound";
import InvalidCredentialsException from "../../exception/InvalidCredentials";
import UserService from "./users.services";
import config from "../../config";

const expiresIn = Number(config.jwt.accessTokenExpiresIn) || 60 * 60;
// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + expiresIn * 60 * 1000),
  maxAge: expiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

// Only set secure to true in production
if (process.env.NODE_ENV === "production")
  accessTokenCookieOptions.secure = true;

export default class UserController {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      //@ts-ignore
      const user = await this.userService.findUser(req.body, next);

      if (user) {
        throw next(new HttpException(401, `User Already Exists`));
      }

      const newUser = await this.userService.createNewUser(req.body);

      console.log("we still got here");
      // Create an Access Token
      // @ts-ignore
      const access_token = await this.userService.signToken(newUser?.email);
      const expiresAt = new Date(Date.now() + expiresIn * 60 * 1000);
      //@ts-ignore
      const userId = newUser.email;

      const data = {
        user: newUser,
        accessToken: access_token,
        expiresAt: expiresAt,
        loggedIn: true,
        userId: userId,
      };

      return res
        .status(201)
        .json({ status: "success", message: "User Created", data });
    } catch (error) {
      console.log(error);
    }
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.signIn(req.body);
      if (!user) {
        throw next(new UserNotFoundException());
      }

      // @ts-ignore
      const access_token = await this.userService.signToken(user?.email);
      console.log("access token", access_token);
      const expiresAt = new Date(Date.now() + expiresIn * 60 * 1000);
      const userId = user.email;
      // Send Access Token in Cookie
      // res.cookie("accessToken", access_token, accessTokenCookieOptions);
      // res.cookie(
      //   "expiresAt",
      //   expiresAt.toISOString(),
      //   accessTokenCookieOptions
      // );
      // res.cookie("loggedIn", true, {
      //   ...accessTokenCookieOptions,
      //   httpOnly: false,
      // });
      // res.cookie("", userId, accessTokenCookieOptions);

      const data = {
        user: user,
        accessToken: access_token,
        expiresAt: expiresAt,
        loggedIn: true,
        userId: userId,
      };

      return res
        .status(200)
        .json({ status: "success", messsage: "User Signin", data });
    } catch (error) {
      console.log(error);
    }
  };

  updateData = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      const user = await this.userService.updateData(req.body, next);

      if (!user) {
        return;
      }

      return res
        .status(200)
        .json({ status: "success", messsage: "User Updated", user });
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      const user = await this.userService.findUser(req.body);
      if (!user) {
        throw next(new UserNotFoundException());
      }
      return res
        .status(200)
        .json({ status: "success", message: "User Found", user });
    } catch (error) {
      console.log(error);
    }
  };

  // updatePassword = async (req:Request, res:Response, next: NextFunction) => {
  //   try {
  //     const updatedUser = await this.userService.updatePassword(req.body);
  //     return res.status(200).json({ updatedUser });
  //   } catch (error) {
  //     return res.status(400).json({ error });
  //   }
  // };

  fetchAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.fetchAllUser();
      if (!users) {
        throw next(new UserNotFoundException());
      }
      return res
        .status(200)
        .json({ status: "success", message: "All Users", users });
    } catch (error) {
      console.log(error);
    }
  };
}

// module.exports = UserController;
// function signToken(user: undefined): { accessToken: any; } | PromiseLike<{ accessToken: any; }> {
//   throw new Error('Function not implemented.');
// }
