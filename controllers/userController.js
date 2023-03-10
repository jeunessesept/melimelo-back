const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const util = require("util");

const { User } = require("../server/models/user.js");
const { Text } = require("../server/models/text.js")
const sign = util.promisify(JWT.sign);


/////////////////////// user register
const register = async (req, res) => {
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

    const newUser = await User.create({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return res.send({ info: "user succesfully added", data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "internal server error" });
  }
};
////////////////////// user login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ error: "invalid request" });

  const query = await User.findOne({
    where: { email: email },
  });

  if (!query) {
    return res.status(404).send({ error: "user do not exists" });
  }

  const match = await bcrypt.compare(password, query.password);
  if (match) {
    try {
      const token = await sign(
        { id: query.id, email: email },
        process.env.SECRET_JWT,
        {
          algorithm: "HS512",
          expiresIn: "1h",
        }
      );
      console.log(token);
      res.cookie("access_token", token, {
        httpOnly: true,
      });
      return res.send({ id: `${query.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Cannot generate token" });
    }
  } else {
    return res.status(403).send({ error: "wrong password" });
  }
};
///////////////////// user logout
const logout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};

const aboutProfile = async (req, res) => {
  const about = req.body.about;

  if(!about){
    return res.status(400).send({ error: "invalid request" })
  }
  try{
  const aboutSection = await User.create({
    about
  })
  return res.send(200).send({aboutSection})
  }catch(error){
    console.error(error)
    return res.status(500).send({error: "internal server error"})
  }
}

const getUserInfos = async (req, res) => {
  const user_id = req.userId
  try{
    const userInfos = await User.findOne({
      where: {
        id: user_id
      }
    })
    return res.status(200).send(userInfos)
  }catch(error){
    console.error(error)
    return res.status(500).send({error: "internal server error"})

  }
}

const textsByUser = async (req, res) => {
  const user_id = req.user_id;
  try{
    const textsbyuser = await Text.findAll({
      attributes: ['id','content'],
      where: { user_id: user_id}
    })
    return res.status(200).send(textsbyuser)
  }catch(error){
    console.error(error)
    return res.status(500).send({error: "internal server error"})
  }
}

//////////////////// exporting modules
module.exports = {
  register,
  login,
  logout,
  aboutProfile,
  textsByUser,
  getUserInfos
};
