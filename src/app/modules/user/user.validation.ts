import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can tnot be more than 20 charactes' }),

  needsPasswordChange: z.string().optional(),
});

export const UserValidation = {
  userValidationSchema,
};
