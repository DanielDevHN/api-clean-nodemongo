import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { 
  validateCreateUser, 
  validateUpdateUser, 
  validateManyUsers, 
  validateIds 
} from '../validators/UserValidator';

export const userRouter = (userController: UserController): Router => {
  const router = Router();

  router.get('/', userController.getAllUsers);
  router.get('/:id', userController.getUserById);
  router.post('/', validateCreateUser, userController.createUser);
  router.put('/:id', validateUpdateUser, userController.updateUser);
  router.delete('/:id', userController.deleteUser);
  router.delete('/', validateIds, userController.deleteManyUsers);
  router.post('/bulk', validateManyUsers, userController.createManyUsers);

  return router;
};