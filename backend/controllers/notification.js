const notification = require('../models/notification')
const { request } = require('express');

const notificationController = {

    getAllNotifications: async (request, response) => {
        try {
            const notifications = await Notification.findAll();
            response.status(200).json(notifications);
        } catch (error) {
            response.status(500).json({message: error.mesaage})
        }
    },

    getNotificationsbyID: async (request, response) => {
        try {
            const notifications = await Notification.findByPk(request.params.id);
            if (notifications) {
                response.status(200).json(notifications);
            } else {
                response.status(404).json({message: 'Notificacion no encontrada'})
            }
        }catch (error) {
            response.status(500).json({message: error.message})
        }
    },

    createNotification: async (request, response) => { 
        try {
            const notification = await Notification.create ({
                content: request.body.content,
                type: request.body.type,
                userID: request.body.userID,
                read: false
            })
            response.status(201).json(notification)
        } catch (error) {
            response.status(500).json({message: error.message})
        }
    },

    markAsRead: async (request, response) => {
        try {
            const notification = await Notification.findByPk(request.params.id);
            if (notification) {
                await notification.update({
                    read: true
                });
                response.status(200).json(notification)
            } else {
                response.status(404).json({message: 'Notifcacion no encontrada'})
            }
        }catch (error) {
            response.status(500).json({message: error.message})
        }
    }, 

    deleteNotification: async (request, response) => {
        try {
            const notification = await Notification.findByPk(request.params.id);
            if (notification) {
                await notification.destroy();
                response.status(200).json({message: 'Notificacion eliminada'})
            } else {
                response.status(404).json({message: 'Notificacion no encontrada'})
            }
        }catch (error) {
            response.status(500).json({message: error.message})
        }
    }
}

module.exports = notificationController