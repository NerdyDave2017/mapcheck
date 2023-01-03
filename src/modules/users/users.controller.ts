import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exception/HttpException';
import UserNotFoundException from '../../exception/UserNotFound';
import InvalidCredentialsException from '../../exception/InvalidCredentials';
import UserService from "./users.services";

export default class UserController {
  userService
  constructor() {
    this.userService = new UserService();
  }

  create = async (req:Request, res:Response, next: NextFunction) => {
    console.log(req.body)
    try {
      const user  = await this.userService.signUp(req.body);
      
      if (user){
        throw next(new HttpException(400, `User Already Exists`))
      }
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
      console.log("controller fetch");
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
