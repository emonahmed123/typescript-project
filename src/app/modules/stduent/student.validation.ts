import { z } from 'zod';

const userNameValidattionSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name can not be more than 20')
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      { message: '{VALUE} IS NOT CAPITAILIZE FORMAT' },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: '{VALUE} IS NOT VALID',
  }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// LocalGuardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student Schema
const createstudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: userNameValidattionSchema,

      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: '{VALUE} is not valid email type' }),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddres: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

// Example data
// const studentData = {
//   id: '12345',
//   name: {
//     firstName: 'John',
//     middleName: 'Doe',
//     lastName: 'Smith',
//   },
//   gender: 'male',
//   dateOfBirth: '2000-01-01',
//   email: 'john.doe@example.com',
//   contactNo: '1234567890',
//   emergencyContactNo: '0987654321',
//   bloodGroup: 'A+',
//   presentAddress: '123 Main St',
//   permanentAddress: '456 Secondary St',
//   guardian: {
//     fatherName: 'John Sr.',
//     fatherOccupation: 'Engineer',
//     fatherContactNo: '1234567890',
//     motherName: 'Jane',
//     motherOccupation: 'Doctor',
//     motherContactNo: '0987654321',
//   },
//   localGuardian: {
//     name: 'Uncle Bob',
//     occupation: 'Teacher',
//     contactNo: '1122334455',
//     address: '789 Tertiary St',
//   },
//   profileImg: 'http://example.com/profile.jpg',
//   isActive: 'active',
// };

export const studentValidations = {
  createstudentValidationSchema,
  updateStudentValidationSchema,
};

// import Joi from 'joi';
// // creating a schema validtion suing joi
// const userNameValidationSchema = Joi.object({
//   firstName: Joi.string()
//     .trim()
//     .max(20)
//     .required()
//     .custom((value, helpers) => {
//       const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
//       if (value !== firstNameStr) {
//         return helpers.message({
//           custom: `${value} is not capitalized format`,
//         });
//       }
//       return value;
//     }),
//   middleName: Joi.string().allow(''),
//   lastName: Joi.string()
//     .required()
//     .custom((value, helpers) => {
//       if (!/^[A-Za-z]+$/.test(value)) {
//         return helpers.message({ custom: `${value} is not a valid name` });
//       }
//       return value;
//     }),
// });

// // Define the Joi schema for Guardian
// const guardianValidationSchema = Joi.object({
//   fatherName: Joi.string().required(),
//   fatherOccupation: Joi.string().required(),
//   fatherContactNo: Joi.string().required(),
//   motherName: Joi.string().required(),
//   motherOccupation: Joi.string().required(),
//   motherContactNo: Joi.string().required(),
// });

// // Define the Joi schema for LocalGuardian
// const localGuardianValidationSchema = Joi.object({
//   name: Joi.string().required(),
//   occupation: Joi.string().required(),
//   contactNo: Joi.string().required(),
//   address: Joi.string().required(),
// });

// // Define the Joi schema for Student
// const studentValidationSchema = Joi.object({
//   id: Joi.string().required(),
//   name: userNameValidationSchema.required(),
//   gender: Joi.string()
//     .valid('male', 'female', 'other')
//     .messages({ 'any.only': '{#value} is not valid' }),
//   dateOfBirth: Joi.string(),
//   email: Joi.string()
//     .email()
//     .required()
//     .messages({ 'string.email': '{#value} is not a valid email type' }),
//   contactNo: Joi.string().required(),
//   emergencyContactNo: Joi.string().required(),
//   bloodGroup: Joi.string().valid(
//     'A+',
//     'A-',
//     'B+',
//     'B-',
//     'AB+',
//     'AB-',
//     'O+',
//     'O-',
//   ),
//   presentAddress: Joi.string().required(),
//   permanentAddres: Joi.string().required(),
//   guardian: guardianValidationSchema.required(),
//   localGuardian: localGuardianValidationSchema.required(),
//   profileImg: Joi.string().uri(),
//   isActive: Joi.string().valid('active', 'blocked').default('active'),
// });

// export default studentValidationSchema;
