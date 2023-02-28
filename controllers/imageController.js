
const cloudinary = require('cloudinary').v2;

const { User } = require("../server/models/user.js");

const cloudinaryConfig = () => {
  cloudinary.config({    // ==> basic cloudinary config (you will retrieve the infos in your cloudinary account)
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
}

const uploadImage = async (req, res) => {
  // recup limage
    const file  = req.files.image
    //envoyer vers cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath)
    // recuperer l'url de limage 
    // lurl que tu dois recuperer dans la db
    if(!file){
        res.status(500).json({error: "file missing"})
    }
    try{
        const image = await User.update({image: result.secure_url},
          {where: {image: null}}
          )
        return res.send({ info: "image succesfully added", data: image });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "internal server error" });
  }
}

module.exports = { uploadImage,
  cloudinaryConfig
 }
