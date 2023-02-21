const { text } = require("../server/models/text.js")


const postTextLoggedIn = async (req, res) => {
    const { content, font_size, color,  } = req.body
    const user_id = req.userId

    if(!!content ){
        return res.status(400).send({ error: "invalid request" });
    }
    try{
        const newText = await text.create({
            content,
            font_size,
            color,
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        })
        return res.send({ info: "user succesfully added", data: newText })
    }catch(error){
        console.error(error)
    }
}

const postTextNoLogged = async (req, res) => { 
    const { content } = req.body
    console.log(content)
    if(!content){
        return res.status(400).send({ error: "invalid request" });
    }
    try{
        const newTextwithoutlog = await text.create({
            content,
            font_size : 4,
            color : 233,
            created_at: new Date(),
            updated_at: new Date(),
        })
        return res.send({ info: "user succesfully added", data: newTextwithoutlog })
    }catch(error){
        console.error(error)
        return res.status(500).send({ error: "internal server error" })

    }

}

const getTextInfos = async (req, res) => {
    try{
    const selectAll = await text.findAll();
    return res.json({info: selectAll})
    }catch(error){
        console.error(error)
        return res.status(500).send({ error: "internal server error" })

    }
}

module.exports = {
    postTextLoggedIn,
    postTextNoLogged,
    getTextInfos,
  };