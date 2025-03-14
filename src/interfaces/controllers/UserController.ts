import { Request, Response } from 'express';
import { UserUseCases } from '../../domain/useCases/UserUseCases';

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userUseCases.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
        count: users.length,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userUseCases.getUserById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const newUser = await this.userUseCases.createUser(userData);

      res.status(201).json({
        success: true,
        data: newUser,
        message: 'User created successfully',
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.userUseCases.updateUser(id, userData);

      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully',
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.userUseCases.deleteUser(id);

      if (!result) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  deleteManyUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ids } = req.body;
      const deletedCount = await this.userUseCases.deleteManyUsers(ids);

      res.status(200).json({
        success: true,
        deletedCount,
        message: `${deletedCount} users deleted successfully`,
      });
    } catch (error) {
      console.error('Error deleting users:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  createManyUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const usersData = req.body;
      const newUsers = await this.userUseCases.createManyUsers(usersData);

      res.status(201).json({
        success: true,
        data: newUsers,
        count: newUsers.length,
        message: `${newUsers.length} users created successfully`,
      });
    } catch (error) {
      console.error('Error creating users:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
}