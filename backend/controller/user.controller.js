import User from "../model/user.model.js";
import { generateTokenAndSave } from "../jwt/token.js";
import * as z from "zod";
import bcrypt from "bcrypt";

const UserSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  username: z.string().min(3, { message: "Username minimum 3 characters!" }),
  password: z
    .string()
    .min(5, { message: "Password must be 5 or more characters!" }),
});

export const registerUser = async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const validate = UserSchema.safeParse({ username, email, password });

  if (!validate.success) {
    const parsed = JSON.parse(validate.error.message);
    return res.status(400).json({ message: parsed[0].message });
  }
  email = email.toLowerCase().trim();

  try {
    const existUser = await User.findOne({ email: email.toLowerCase().trim() });

    console.log("User exist", email, existUser);
    if (existUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists!" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashPass,
    });

    await newUser.save();
    const token = await generateTokenAndSave(newUser._id, res);

    res.status(200).json({ message: "Registered user successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const token = await generateTokenAndSave(user._id, res);

    return res
      .status(200)
      .json({ message: "Signed in Successful!", user, token });
  } catch (error) {
    return res.status(400).json({ message: "Username or password incorrect" });
  }
};

export const logOut = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to logout!", error });
  }
};
