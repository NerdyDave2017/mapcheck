import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exception/HttpException';
import UserNotFoundException from '../../exception/UserNotFound';
import InvalidCredentialsException from '../../exception/InvalidCredentials';
import MarkerService from "./markers.services";

export default class UserController {
  markerService
  constructor() {
    this.markerService = new MarkerService();
  }

  create = async (req:Request, res:Response, next: NextFunction) => {
    console.log(req.body)
    try {
      const marker  = await this.markerService.create(req.body);
      
      return res.status(201).json({ status: "success", message: "Marker Created", marker });
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (req:Request, res:Response, next: NextFunction) => {
    try {
      const marker  = await this.markerService.delete(req.body);
      console.log(marker)
      if (!marker) {
        throw next(new HttpException(404, "Marker not found"))
      }
      return res.status(200).json({ status:"success", messsage:"MarkerDeleted"});
    } catch (error) {
      console.log(error);
    }
  }

  fetchAllMarkers = async (req:Request, res:Response, next: NextFunction) => {
    try {
      
      const markers  = await this.markerService.fetchAllMarkers();
      if(!markers) {
        throw next(new HttpException(404, "Markers not found"))
      }
      return res.status(200).json({status:"success", message: "All Markers", markers });
    } catch (error) {
      console.log(error)
    }
  };
}

module.exports = UserController;
