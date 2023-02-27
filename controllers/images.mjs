import { dbConnect } from "../server/config/config.js";
import { v2 as cloudinary } from "cloudinary";

const { User } = require("../server/models/user.js");

export const uploadImage = async (req, res) => {
    const file  = await cloudinary.uploader.upload(file.tempFilePath)
    console.log(file)
    if(!file){
        res.status(500).json({error: "file missing"})
    }
    try{
        const image = await User.create({
            images
        })
        return res.send({ info: "image succesfully added", data: image });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "internal server error" });
  }
};


