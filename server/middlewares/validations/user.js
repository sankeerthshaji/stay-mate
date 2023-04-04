const yup = require("yup");
const User = require("../../models/user");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const admissionSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(50, "Name should not exceed 50 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(passwordRegex, { message: "Please create a stronger password" })
    .required("Password is required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"], "Gender is required")
    .required("Gender is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Mobile number is required"),
  aadharNumber: yup
    .string()
    .matches(/^[0-9]{12}$/, "Aadhar number should be 12 digits")
    .required("Aadhar number is required"),
  parentName: yup
    .string()
    .max(50, "Name should not exceed 50 characters")
    .required("Parent name is required"),
  parentMobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Mobile number is required"),
  bloodGroup: yup
    .string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Blood group is required"
    )
    .required("Blood group is required"),
  houseName: yup
    .string()
    .max(50, "House name should not exceed 50 characters")
    .required("House name is required"),
  area: yup
    .string()
    .max(50, "Area should not exceed 50 characters")
    .required("Area is required"),
  landmark: yup
    .string()
    .max(100, "Landmark should not exceed 100 characters")
    .required("Landmark is required"),
  city: yup
    .string()
    .max(50, "City should not exceed 50 characters")
    .required("City is required"),
  state: yup
    .string()
    .max(50, "State should not exceed 50 characters")
    .required("State is required"),
  country: yup
    .string()
    .max(50, "Country should not exceed 50 characters")
    .required("Country is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode should be 6 digits")
    .required("Pincode is required"),
});

const validateSchema = (schema) => async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("Image file is required");
    }
    const values = JSON.parse(req.body.values);
    await schema.validate(values, { abortEarly: false });
    const exists = await User.find({
      $or: [{ email: values?.email }, { mobileNumber: values?.mobileNumber }],
    });
    if (exists.length > 0) {
      throw new Error("User already exists");
    }
    next();
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      return res.status(400).json({ errors });
    }
    res.status(400).json({ error: err.message });
  }
};

const admissionValidationMiddleware = validateSchema(admissionSchema);

module.exports = admissionValidationMiddleware;

