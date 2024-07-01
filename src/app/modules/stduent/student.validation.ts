import Joi from 'joi';
// creating a schema validtion suing joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom((value, helpers) => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      if (value !== firstNameStr) {
        return helpers.message({
          custom: `${value} is not capitalized format`,
        });
      }
      return value;
    }),
  middleName: Joi.string().allow(''),
  lastName: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!/^[A-Za-z]+$/.test(value)) {
        return helpers.message({ custom: `${value} is not a valid name` });
      }
      return value;
    }),
});

// Define the Joi schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// Define the Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Define the Joi schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .messages({ 'any.only': '{#value} is not valid' }),
  dateOfBirth: Joi.string(),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'string.email': '{#value} is not a valid email type' }),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddres: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
