import UserModel from "../../models/user/users.model";
import { NextFunction, Request, Response } from "express";
import {
  IUserInput,
  IChangePassword,
  IUserSignin,
  IUserCreate,
} from "../../interfaces/user";
import { matchPassword } from "../../utils/matchPassword";
import HttpException from "../../exception/HttpException";
import InvalidCredentialsException from "../../exception/InvalidCredentials";
import UserNotFoundException from "../../exception/UserNotFound";
import { signJwt } from "../../utils/jwt";
import config from "../../config";
import { IUser } from "../../models/user/users.model";

export default class UserService {
  userModel;
  constructor() {
    this.userModel = new UserModel();
  }

  createNewUser = async (userData: IUserCreate) => {
    console.log("user service", userData);
    try {
      const user = await this.userModel.create(userData);
      // Email verification dependency
      //@ts-ignore
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  signIn = async (userData: IUserSignin) => {
    const { email, password } = userData;
    console.log(email, password);
    try {
      const user = await this.userModel.findByEmail(email);

      if (user) {
        const validPassword = await matchPassword(password, user.password);

        if (!validPassword) {
          return false;
        }
        return user;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateData = async (userData: IUserInput, next: NextFunction) => {
    try {
      const { email, password, newPassword, ...rest } = userData;

      const user = await this.userModel.findByEmail(email);

      if (!user) {
        throw next(new UserNotFoundException());
      }

      if (password) {
        /* A function that compares the password entered by the user with the password in the database. */
        const validPassword = await matchPassword(password, user.password);

        if (!validPassword) {
          throw next(new InvalidCredentialsException());
        }
        const updatedUser = await this.userModel.update(email, {
          password: newPassword,
          ...rest,
        });

        return updatedUser;
      }

      const updatedUser = await this.userModel.update(email, { ...rest });

      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (userData: IUserInput) => {
    try {
      const { email } = userData;

      const user = await this.userModel.findByEmail(email);

      return user;
    } catch (err) {
      console.log(err);
    }
  };

  signToken = async (email: string) => {
    console.log(email);
    // Sign the access token
    const access_token = signJwt(
      { sub: email },
      {
        expiresIn: `${config.jwt.accessTokenExpiresIn}m`,
      }
    );

    console.log("access", access_token);

    // Return access token
    return access_token;
  };

  // updatePassword = async (userData:IChangePassword) => {
  //   const { email, password, newPassword } = userData;
  //   try {
  //     const user  = await this.userModel.findByEmail(email);

  //     if (!user) {
  //       throw new Error(`User does not exist`);
  //     }

  //     /* A function that compares the password entered by the user with the password in the database. */
  //     const validPassword = await matchPassword(password, user.password);

  //     if (!validPassword) {
  //       throw new Error(`Invalid credentials`);
  //     }

  //     const updatedUser  = await this.userModel.update(email, {
  //       password: newPassword,
  //     });

  //     return { updatedUser };
  //   } catch (error) {}
  // };

  fetchAllUser = async () => {
    const users = await this.userModel.getAll();
    return users;
  };
}
