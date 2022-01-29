import { UserModel } from "../models";
import { IUser } from "../interfaces";
import { CustomError, ErrorTypes } from "../services";

export class User {
  async add(data: IUser) {
    try {
      const user = new UserModel();
      const hashedPassword = await user.generateHash(data.password);
      return await UserModel.create({
        username: data.username,
        password: hashedPassword,
        role: data.role,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_CREDENTIALS);
    }
  }

  async addDeposit(id: string, deposit: number) {
    try {
      return await UserModel.updateOne({ _id: id }, { $inc: { deposit } });
    } catch (error) {
      console.log(error);
      throw new CustomError({
        code: ErrorTypes.INVALID_ACTION.code,
        message: `${ErrorTypes.INVALID_ACTION.message}. Failed to add deposit ${deposit}`,
      });
    }
  }

  async resetDeposit(id: string) {
    try {
      const userData = await UserModel.findOne({ _id: id }, { _id: 0, __v: 0 });
      await UserModel.updateOne({ _id: id }, { deposit: 0 });
      return userData.deposit;
    } catch (error) {
      console.log(error);
      throw new CustomError({
        code: ErrorTypes.INVALID_ACTION.code,
        message: `${ErrorTypes.INVALID_ACTION.message}. Failed to reset deposit`,
      });
    }
  }

  async getById(id: string) {
    try {
      console.log(`Getting a user account with id: ${id}`);
      const user = await UserModel.findOne({ _id: id }, { __v: 0, _id: 0, password: 0 });
      if (user) return user;
      else throw new Error();
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_USER_ID);
    }
  }

  async getByUserName(username: string, password: string) {
    try {
      const user = new UserModel();
      const userData = await UserModel.findOne({ username });
      const checkPassword = await user.validPassword(password, userData?.password);
      if (!userData || !checkPassword) throw new Error();
      return userData;
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_CREDENTIALS);
    }
  }

  async update(id: string, password: string) {
    try {
      const user = new UserModel();
      const hashedPassword = await user.generateHash(password);
      return await UserModel.updateOne({ _id: id }, { password: hashedPassword });
    } catch (error) {
      console.log(error);
      throw new CustomError({
        code: ErrorTypes.INVALID_ACTION.code,
        message: `${ErrorTypes.INVALID_ACTION.message}. Failed to update this user`,
      });
    }
  }

  async remove(id: string) {
    try {
      return await UserModel.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
      throw new CustomError({
        code: ErrorTypes.INVALID_ACTION.code,
        message: `${ErrorTypes.INVALID_ACTION.message}. Failed to remove this user`,
      });
    }
  }
}
