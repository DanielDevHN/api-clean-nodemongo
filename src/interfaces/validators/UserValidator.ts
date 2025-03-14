import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    age: Joi.number().required().min(0).max(120),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50),
    age: Joi.number().min(0).max(120),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export const validateManyUsers = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.array().items(
    Joi.object({
      name: Joi.string().required().min(2).max(50),
      age: Joi.number().required().min(0).max(120),
    })
  );

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export const validateIds = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    ids: Joi.array().items(Joi.string().required()).required(),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};