const { User } = require('../server/models/user')
const { Group } = require('../server/models/groups.js')
const { TextGroup } = require('../server/models/texts_group.js')


const postText = async(req, res) => {
    const user_id = req.userId
    const group_id = req.params.id
    const { content } = req.body

    if(!content){
        return res.status(400).send({error: "no content provided"})
    }
    try{
        const newtext = await TextGroup.create({
            user_id,
            group_id,
            content,
            created_at: new Date(),
            updated_at: new Date(),  
        })
        return res.status(200).send('text succesfuly added')
    }catch(error){
        console.error(error)
        return res.status(500).send('internal server error')
    }
}


const getText = async (req, res) => {
    const group_id = req.params.id

    const confirmGroupId = await TextGroup.findAll({
        where: {
            group_id : group_id
        }
    })
    if(group_id !== confirmGroupId.group_id){
        return res.status(404).send("not found")
    }else{
        try{
            const getText = await TextGroup.findAll({
                attributes: ['content'],
                where: {
                    group_id: group_id
                }
            })
            return res.statu(200).send({getText})
        }catch(error){
            console.error(error)
            return res.status(500).send("internal server error")
        }
    }
}