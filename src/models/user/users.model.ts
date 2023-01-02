import {Types, Schema, Document, model, Model} from "mongoose";
import bcrypt from "bcrypt";
import { IUserInput,IChangePassword,IUserSignin, IUserCreate, IUpdateUser  } from "../../interfaces/user";

interface IUser extends Document{
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  markers?: Types.ObjectId[];
}

interface IUserDocument extends IUser{}



const UserSchema   = new Schema<IUser>(
  {
    firstname: { type: String },
    lastname: {type: String},
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    markers: [{ type: Schema.Types.ObjectId, ref: "Marker" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// UserSchema.methods.matchPassword = async function(enteredPassword : string) {
//   return await bcrypt.compare(enteredPassword, this.password); 
// };

const Users = model<IUser>("User", UserSchema);


class UserModel {
  
  Users = Users
  constructor() {
    // this.Users = Users;
  }

  create = async (userData : IUserCreate ) => {
    try {
      const newUser = await this.Users.create({
        ...userData,
      },{ password: 0 });
      return { user: newUser };
    } catch (error) {
      console.log(error);
    }
  };

  update = async (email : string, userData : IUpdateUser) => {
    try {
      const updatedUser = await this.Users.findOneAndUpdate(
        { email: email },
        {
          ...userData,
        },
        { password: 0 }, //Don't return password
      );
      return updatedUser;
    } catch (error) {}
  };

  findByEmail = async (email: string) => {
    try {
      const user = await this.Users.findOne({ email: email }); //Don't return password
      return user;
    } catch (error) {}
  }

  getAll = async () =>  {
    try {
      const users = await this.Users.find({}, { password: 0 }); //Don't return password
      return users;
    } catch (error) {}
  };
}

export default UserModel;
