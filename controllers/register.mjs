import bcrypt, { hash } from "bcrypt";
import pkg from "../server/models/user.js";
import User_model from "../server/models/user.js";

const User = User_model.User;

export const register = async (req, res) => {
  const { first_name, last_name, username, email, password, confirm_password } =
    req.body;

  if (!first_name || !last_name || !email || !password || !username)
    return res.status(400).send({ error: "invalid request" });

  if (password !== confirm_password) {
    return res.status(400).send({ error: "passwords do not match" });
  }

  if (!password || !confirm_password) {
    return res
      .status(400)
      .send({ error: "password or confirm password is not provided" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({   //// why create() doesn't works ?
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser)
    return res.send({ info: "user succesfully added", data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "internal server error" });
  }
};
