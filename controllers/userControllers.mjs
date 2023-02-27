//importing modules 
 import bcrypt from 'bcrypt' 
 import { dbConnect } from '../models/connectDB.mjs' 
 import jwt from'jsonwebtoken' 
  
 // Assigning users to the variable User 
 import User from '../sequelize/models/user.js'
  
 //signing a user up 
 //hashing users password before its saved to the database with bcrypt 
export const register = async (req, res) => { 
  const { first_name, last_name, username, email, password, confirm_password } = req.body; 
  
// si cest nul ou undefined :
  if (!first_name || !last_name || !username || !email || !password || !confirm_password ) {
    return res.status(400).send({ error: "invalid request" })
  }
// si le password et confirm_password sont differents :
if (password !== confirm_password) {
  return res.status(400).send({ error: "passwords do not match" });
}

  try { 
    const newUser = { 
      first_name,
      last_name,
      username, 
      email, 
      password: await bcrypt.hash(password, 10), 
    }; 
    //saving the user 
    const user = await User.create(newUser); 
    return res.send({ info: "user succesfully added", data: newUser });
  } catch (error) { 
    console.log(error); 
  } 
 }; 
  
  
 //login authentication 
  
// const login = async (req, res) => { 

// const { email, password } = req.body; 
// if (!email || !password)
// return res.status(400).send({ error: "invalid request" });
  
// //find a user by their email 
// const user = await User.findOne({ email }); 
// // s'il est different dun user existant
// if (!user) {
//   return res.status(404).send({ error: "user do not exists" });
// }

// //if user email is found, compare password with bcrypt 
// if (user) { 
//   try {
//     const isSame = await bcrypt.compare(password, user.password); 
//     //if password is the same : generate token with the user's id and the secretKey in the env file 
//     if (isSame) { 
//       let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {expiresIn: 1 * 24 * 60 * 60 * 1000,}); 
//       //if password matches wit the one in the database 
//       //go ahead and generate a cookie for the user 
//       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true }); 
//       console.log("user", JSON.stringify(user, null, 2)); 
//       console.log(token); 
//       //send user data 
//       return res.status(201).send(user); 
//     } else { return res.status(401).send("Authentication failed");} 
//   } 
//   catch (error) {console.log(error);} 
// }
// }
