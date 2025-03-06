const message = require('../models/messages')

const messageController = {
    getConversation: async (request, response) => {
        try {
            const messages = await message.findAll({
                where: {
                    [Op.or]: [
                        { senderID: request.params.user1, receiverID: request.params.user2 },
                        { senderID: request.params.user2, receiverID: request.params.user1 }
                    ]
                },
                order: [['createdAt', 'ASC']]
            });
            response.status(200).json(messages)
        } catch (error) {
            response.status(500).json({message: error.message})
        }
    },

    getUserMessages: async (request, response) => {
        try {
            const messages = await message.findAll({
                where: {
                    [Op.or]: [
                        { senderID: request.params.userID },
                        { receiverID: request.params.userID }
                    ]
                }
            });
            response.status(200).json(messages)
        } catch (error) {
            response.status(500).json({message: error.message})
        }
    },

    createMessage: async (request, response) => {
        try {
            const messages = await message.create({
                content: request.body.content,
                senderID: request.body.senderID,
                receiverID: request.body.receiverID
            });
            response.status(201).json(messages)
        } catch (error) {
            response.status(500).json({message: error.message})
        }
    },

    deleteMessage: async (request, response) => {
        try {
            const message = await message.findByPk(request.params.id);
            if (message) {
                await message.destroy();
                response.status(200).json({message: 'Mensaje eliminado'})
            } else {
                response.status(404).json({message: 'No se puedo encontrar el mensaje'})
            }
        } catch {
            response.status(500).json({message: error.message})
        }
    }
}

module.exports = messageController;