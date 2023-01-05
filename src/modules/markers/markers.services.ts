import MarkerModel,{IMarker} from "../../models/markers/markers.model";
import { NextFunction, Request, Response } from 'express';
import { IUserInput,IChangePassword,IUserSignin, IUserCreate } from "../../interfaces/user";
import { matchPassword } from "../../utils/matchPassword";
import HttpException from '../../exception/HttpException';
import InvalidCredentialsException from "../../exception/InvalidCredentials";
import UserNotFoundException from "../../exception/UserNotFound";

export default class UserService{
  markerModel
  constructor() {
    this.markerModel  = new MarkerModel();
  }

  create = async (userData: IMarker) => {
    try {

      const marker  = await this.markerModel.create(userData);
      // Email verification dependency

      return marker;
    } catch (error) {
      console.log(error)
    }
  };

  delete = async (id: string) => {
    try {
      const marker = await this.markerModel.findById(id);
      if (marker) {
        const deletedMarker = await this.markerModel.delete(id);
        return deletedMarker;
      }
      return marker;
    } catch (error) {
      console.log(error);
    }
  }

  fetchAllMarkers = async () => {
    const users  = await this.markerModel.getAll();
    return users;
  };
}

;
