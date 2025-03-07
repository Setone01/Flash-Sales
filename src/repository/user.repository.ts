import { UserModel } from "@src/database/models/user.model";
import { UserI } from "@src/interface";

class UserRepository {
  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<UserI | null> {
    return await UserModel.findOne({ email });
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<UserI | null> {
    return await UserModel.findById(id);
  }

  /**
   * Create a new user
   */
  async createUser(userData: Partial<UserI>): Promise<UserI> {
    const user = new UserModel(userData);
    return await user.save();
  }
}

export default new UserRepository();
