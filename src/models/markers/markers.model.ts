import {Types, Schema, Document, model, Model} from "mongoose";
import bcrypt from "bcrypt";
import { IUserInput,IChangePassword,IUserSignin, IUserCreate, IUpdateUser  } from "../../interfaces/user";

export interface IMarker extends Document{
  user: Types.ObjectId;
  location: ILocation;
  markerType: string;
  description: string;
}

interface ILocation {
  longitute: number;
  latitude: number;
}

const UserSchema   = new Schema<IMarker>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: {
      longitute: { type: Number},
      latitude: { type: Number },
      required: true 
    },
    markerType: { type: String, required: true  }, // "Speed Camera" | "Police Checkpoint" | "Roadworks" | "Accident" | "Road Damage" | "Other"
    description: { type: String },
  },
  {
    timestamps: true,
  }
);


const Markers = model<IMarker>("Marker", UserSchema);


class UserModel {
  
  Markers = Markers
  constructor() {
    
  }

  create = async (markerData : IMarker ) => {
    
    try {
      const newMarker = await this.Markers.create({
        ...markerData,
      },{ password: 0 });
      return newMarker;
    } catch (error) {
      console.log(error);
    }
  };

  findById = async (id: string) => {
    try {
      const marker = await this.Markers.findById(id)
      .populate("user"); //Don't return password
      return marker;
    } catch (error) {
      console.log(error)
    }
  }

  delete = async (id: string) => {
    try {
      const marker = await this.Markers.findByIdAndDelete(id)
      return marker;
    } catch (error) {
      console.log(error)
    }
  }

  getAll = async () =>  {
    try {
      const markers = await this.Markers.find({}, { password: 0 })
      .populate("user"); //Don't return password
      return markers;
    } catch (error) {}
  };
}

export default UserModel;
