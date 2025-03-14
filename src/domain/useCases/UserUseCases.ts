import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

/***
 * This class is responsible for the business rules of the User entity.
 * It receives the UserRepository as a dependency and uses it to perform the operations.
 * The methods of this class are the use cases of the User entity.
 */ 
export class UserUseCases {
    constructor(private UserRepository: UserRepository) {}

    async getAllUsers(): Promise<User[]> {
        return this.UserRepository.findAll();
    }

    async getUserById(id: string): Promise<User | null> {
        return this.UserRepository.findById(id);
    }

    async createUser(user: User): Promise<User> {
        return this.UserRepository.create(user);
    }

    async updateUser(id: string, user: User): Promise<User | null> {
        return this.UserRepository.update(id, user);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.UserRepository.delete(id);
    }

    async deleteManyUsers(ids: string[]): Promise<number> {
        return this.UserRepository.deleteMany(ids);
    }

    async createManyUsers(users: User[]): Promise<User[]> {
        return this.UserRepository.createMany(users);
    }
}