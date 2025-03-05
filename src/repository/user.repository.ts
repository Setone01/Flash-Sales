import { UserModel } from "../database/models/user.model";
import { UserI } from "../interface";

export class UserRepository {
  async createUser(userData: Partial<UserI>): Promise<UserI> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async getUserByEmail(email: string): Promise<UserI | null> {
    return await UserModel.findOne({ email }).lean();
  }

  async getUserById(id: string): Promise<UserI | null> {
    return await UserModel.findById(id).lean();
  }

  async updateUser(
    id: string,
    updateData: Partial<UserI>
  ): Promise<UserI | null> {
    const user = await UserModel.findById(id); // Fetch user document
    if (!user) return null; // Return null if user is not found

    // Update fields only if provided
    if (updateData.username) user.username = updateData.username;
    if (updateData.email) user.email = updateData.email;
    if (updateData.password) user.password = updateData.password;
    if (updateData.purchasedProducts)
      user.purchasedProducts = updateData.purchasedProducts;

    return await user.save(); // Save changes and return updated user
  }

  async deleteUser(id: string): Promise<UserI | null> {
    return await UserModel.findByIdAndDelete(id).lean();
  }
}
