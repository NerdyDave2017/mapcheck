import UserModel from "../../models/user/users.model";
import { IUserInput,IChangePassword,IUserSignin, IUserCreate } from "../../interfaces/user";
import { matchPassword } from "../../utils/matchPassword";


class UserService {
  userModel
  constructor() {
    this.userModel  = new UserModel();
  }

  signUp = async (userData: IUserCreate) => {
    try {
      const { email } = userData;
      console.log(email);

      const userExist  = await this.userModel.findByEmail(email);

      

      if (userExist) {
        throw new Error(`User Already Exists`);
      }

      const user  = await this.userModel.create(userData);

      // Email verification dependency

      return user ;
    } catch (error) {}
  };

  signIn = async (userData: IUserSignin) => {
    const { email, password } = userData
    try {
      const user = await this.userModel.findByEmail(email);

      if (user) {
        const validPassword = await matchPassword(password, user.password);

        if (!validPassword) {
          throw new Error(`Invalid credentials`);
        }
        return  user ;
      } else {
        throw new Error(`Invalid credentials`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateData = async (userData:IUserInput) => {
    try {
      const { email, password, ...rest } = userData;
      if (password) {
        throw new Error(`Password cannot be updated`);
      }

      const user = await this.userModel.findByEmail(email);

      if (!user) {
        throw new Error(`User does not exist`);
      }

      const updatedUser  = await this.userModel.update(email, { ...rest });

      return { updatedUser };
    } catch (error) {}
  };

  updatePassword = async (userData:IChangePassword) => {
    const { email, password, newPassword } = userData;
    try {
      const user  = await this.userModel.findByEmail(email);

      if (!user) {
        throw new Error(`User does not exist`);
      }


      /* A function that compares the password entered by the user with the password in the database. */
      const validPassword = await matchPassword(password, user.password);

      if (!validPassword) {
        throw new Error(`Invalid credentials`);
      }

      const updatedUser  = await this.userModel.update(email, {
        password: newPassword,
      });

      return { updatedUser };
    } catch (error) {}
  };

  fetchAllUser = async () => {
    const users  = await this.userModel.getAll();
    return { users };
  };
}

module.exports = UserService;
