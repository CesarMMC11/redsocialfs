const reaction = require('../models/reaction')

const reactionController = {

    getAllReactions: async (request, response) => {
        try {
            const reactions = await Reaction.findAll();
            response.satus(200).json(reactions);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    getByPost: async (request, response) => {
        try {
            const reactions = await Reaction.findAll({
                where: {
                    postID: request.params.postID
                }
            });
            response.status(200).json(reactions)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    },

    createReaction: async (request, response) => {
        try {
            const reaction = await Reaction.create({
                type: request.body.type,
                userID: request.body.userID,
                postID: request.body.postID
            });
            response.status(201).json(reaction)
        } catch (error) {
            response.status(500).json({message: error.message})
        }
    },

    updateReaction: async (request, response) => {
        try{
            const reaction = await Reaction.findByPk(request.params.id);
            if (reaction) {
                await reaction.update({
                    type: request.body.type
                });
                response.status(200).json(reaction)
            } else {
                response.status(404).json({message: 'Reaccion no encontrada'})
            }
        } catch (error) {
            response.status(500).json({message: error.message})
        }
    },

    deleteReaction: async (request, response) => {
        try {
            const reaction = await Reaction.findByPk(request.params.id);
            if (reaction) {
                await reaction.destroy();
                response.status(200).json({message: 'Reaccion Eliminada'})
            } else {
                response.status(404).json({message: 'Reaccion no encontrada'})
            }
        } catch (error) {
            response.status(500).json({message: error.message})
        }
    }

}

module.exports = reactionController