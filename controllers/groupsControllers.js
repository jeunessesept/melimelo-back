const { Group } = require('../server/models/groups.js')
const { User } = require('../server/models/user.js')

const createGroup = async (req, res) => {
    const user_id = req.userId
    const { group_name, subject } = req.body
    if(!user_id){
        return res.status(401).send({ error: "not authorized" })
    }
    if(!group_name){
        return res.status(400).send({error: "the name of the group is missing"})
    }
    try{
        const newGroup = await Group.create({
            group_name,
            user_id,
            subject,
            created_at: new Date(),
            updated_at: new Date(),

        })
    return res.send(newGroup)
    }catch(error){
        console.error(error)
        return res.status(500).send({error: "internal server error"})
    }

}


const deleteGroup = async (req, res) => {
    const userId = req.userId
    const group_id = req.params.id;
    if(!group_id){
        return res.status(400).send({error: "table not found"})
    }
    const group_admin = await Group.findAll({
        attributes: ['user_id'],
        where : {
            id: group_id
        }
    })
    if(userId === group_admin.user_id){
        try{
            const groupToDelete = await Group.destroy({
                where: {
                    id: group_id
                }
            })
        return res.status(200).send({info: "the group was succesfully deleted", groupToDelete})
        }catch(error){
            console.error(error)
            return res.status(500).send({error: "internal server error"})
        }
    }else{
        return res.status(401).send({ error: "not authorized" })
    }
}

module.exports = { createGroup, deleteGroup }