import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import UserModel from "../../models/user/users.model";
import UserService from "./users.services";

class UserController {
  
  userService
  constructor() {
    this.userService = new UserService();
  }

  create = async (req:Request, res:Response) => {
    console.log(this);
    console.log(this.userService);
    console.log(req.body);
    try {
      const { user } = await this.userService.signUp(req.body);
      return res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  };

  signIn = async (req:Request, res:Response) => {
    try {
      const { user } = await this.userService.signIn(req.body);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  updateData = async (req:Request, res:Response) => {
    try {
      const { updatedUser } = await this.userService.updateData(req.body);
      return res.status(200).json({ updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  updatePassword = async (req:Request, res:Response) => {
    try {
      const { updatedUser } = await this.userService.updatePassword(req.body);
      return res.status(200).json({ updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  fetchAllUsers = async (req:Request, res:Response) => {
    try {
      console.log("controller fetch");
      const { users } = await this.userService.fetchAllUser();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

module.exports = UserController;
