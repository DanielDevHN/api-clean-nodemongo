import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import UserModel, { UserDocument } from '../database/mongoose/models/UserModel';

export class MongoUserRepository implements UserRepository {
  private mapToUser(doc: UserDocument): User {
    return {
      userId: doc.id,
      name: doc.name,
      age: doc.age,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find().sort({ createdAt: -1 });
    return users.map(this.mapToUser);
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await UserModel.findById(id);
      return user ? this.mapToUser(user) : null;
    } catch (error) {
      return null;
    }
  }

  async create(userData: User): Promise<User> {
    const user = new UserModel(userData);
    const savedUser = await user.save();
    return this.mapToUser(savedUser);
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { $set: userData },
        { new: true }
      );
      return updatedUser ? this.mapToUser(updatedUser) : null;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      return false;
    }
  }

  async deleteMany(ids: string[]): Promise<number> {
    try {
      const result = await UserModel.deleteMany({ _id: { $in: ids } });
      return result.deletedCount || 0;
    } catch (error) {
      return 0;
    }
  }

  async createMany(users: User[]): Promise<User[]> {
    try {
      const result = await UserModel.insertMany(users);
      return result.map(this.mapToUser);
    } catch (error) {
      return [];
    }
  }
}