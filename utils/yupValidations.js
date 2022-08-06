import * as yup from "yup";

class Yup {
  userRegisterSchema = yup.object().shape({
    name: yup.string().trim().required({ message: "Name is required." }),
    lastName: yup.string().trim().required({ message: "Lastname is required." }),
    username: yup.string().trim().required({ message: "Username is required." }),
    email: yup.string().email({ message: "Email is invalid." }).required({ message: "Email is required." }),
    password: yup
      .string()
      .trim()
      .min(4, { message: "Password must have at least 4 characters." })
      .required({ message: "Password is required." }),
  });

  userLoginSchema = yup.object().shape({
    email: yup.string().email({ message: "Email is invalid." }).required({ message: "Email is required." }),
    password: yup
      .string()
      .trim()
      .min(4, { message: "Password must have at least 4 characters." })
      .required({ message: "Password is required." }),
  });

  forgotPasswordSchema = yup.object().shape({
    email: yup.string().email({ message: "Email is invalid." }).required({ message: "Email is required." }),
  });

  updatePasswordSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .min(4, { message: "Password must have at least 4 characters." })
      .required({ message: "Password is required." }),
  });

  updateUserData = yup.object().shape({
    name: yup.string().trim().required({ message: "Name is required." }),
    lastName: yup.string().trim().required({ message: "Lastname is required." }),
  });

  createProductSchema = yup.object().shape({
    title: yup.string().trim().required({ message: "Title is required." }),
    price: yup.number().required({ message: "Price is required." }),
    description: yup.string().trim(),
  });
}

export default new Yup();
