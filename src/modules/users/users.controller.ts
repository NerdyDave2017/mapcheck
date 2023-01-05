import { CookieOptions,NextFunction, Request, Response } from 'express';
import HttpException from '../../exception/HttpException';
import UserNotFoundException from '../../exception/UserNotFound';
import InvalidCredentialsException from '../../exception/InvalidCredentials';
import UserService from "./users.services";
import config from "../../config";

const expiresIn = Number(config.jwt.accessTokenExpiresIn) || 60 * 60 * 24 * 7;
// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + expiresIn * 60 * 1000),
  maxAge: expiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

export default class UserController {
  userService
  constructor() {
    this.userService = new UserService();
  }

  create = async (req:Request, res:Response, next: NextFunction) => {
    console.log(req.body)
    try {
      const user  = await this.userService.signUp(req.body, next);
      
      // if (){
      //   throw next(new HttpException(400, `User Already Exists`))
      // }


      // Create an Access Token
      // @ts-ignore
      const { accessToken } = await signToken(user?._id);

      // Send Access Token in Cookie
      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return res.status(201).json({ status: "success", message: "User Created", user });
    } catch (error) {
      console.log(error);
    }
  };

  signIn = async (req:Request, res:Response, next: NextFunction) => {
    try {
      const user  = await this.userService.signIn(req.body);
      if (!user) {
        throw next(new UserNotFoundException)
      }
      return res.status(200).json({ status:"success", messsage:"User Signin", user });
    } catch (error) {
      console.log(error);
    }
  };

  updateData = async (req:Request, res:Response, next: NextFunction) => {
    console.log(req.body)
    try {
      const user = await this.userService.updateData(req.body, next);
      
      if(!user) {
        return
      }

      return res.status(200).json({ status:"success", messsage:"User Updated", user });
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

  fetchAllUsers = async (req:Request, res:Response, next: NextFunction) => {
    try {
      
      const users  = await this.userService.fetchAllUser();
      if(!users) {
        throw next(new UserNotFoundException)
      }
      return res.status(200).json({status:"success", message: "All Users", users });
    } catch (error) {
      console.log(error)
    }
  };
}



module.exports = UserController;
function signToken(user: undefined): { accessToken: any; } | PromiseLike<{ accessToken: any; }> {
  throw new Error('Function not implemented.');
}

