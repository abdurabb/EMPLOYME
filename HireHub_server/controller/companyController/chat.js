const Chat = require('../../models/chatSchema')
const User = require('../../models/User')
const Message = require('../../models/Messege')

// HERE Getting all Chat list for print in sidebar of the chat page
const getUsers = async (req, res) => {
    try {
        const companyId = req.query.id;
        const chats = await Chat.find({
            participants: {
                $elemMatch: {
                    $in: [companyId]
                }
            }
        }).sort({timestamp:-1})


        const chatUserData = await Promise.all(chats.map(async (chat) => {
            const receiverId = await chat.participants.find((member) => member !== companyId);
            const user = await User.findById(receiverId);
            return { userId: user._id, user: { image: user.Image, email: user.email, first_name: user.first_name }, chatId: chat._id, lastMessege: chat.lastMessege }
        }))

        return res.status(200).json({
            chatUserData
        })

    } catch (error) {
        console.log(error + 'in company chat');
        return res.status(400).json({
            success: false,
            messege: 'Something Wrong',
            error
        })
    }
}

// here getting all messeges of the chat between users and company
const getMesseges = async (req, res) => {
    try {
        const chatId = req.query.id
        const chatData = await Chat.findById({ _id: chatId }).exec();
        const data = await Promise.all(chatData.messages.map(async (messege) => {
            return (
                await Message.findById({ _id: messege })
            )
        }))

        if (data) {
            return res.status(200).json({
                success: true,
                messege: 'Success',
                data: data
            })
        }

    } catch (error) {
        console.log('errorr');
        return res.status(400).json({
            success: false,
            messege: 'Something Wrong',
            error
        })
    }
}

// Here Creating New Meseges
const createNewMessege = async (req, res) => {
    try {

        const body = req.body
        if (body.chatId) {
            const messege = new Message({
                chat: body.chatId,
                sender: body.companyId,
                receiver: body.userId,
                messege: body.messege
            })
            const messageData = await messege.save()

            const chatDataUpdate = await Chat.findByIdAndUpdate(
                { _id: body.chatId },
                {
                    timestamp:Date.now(),
                    lastMessege: body.messege,
                    $push: { messages: messageData._id }
                })

        } else {
            const chat = new Chat({
                participants: [body.userId, body.companyId],
                lastMessege: body.messege,
            })
            const chatData = await chat.save()

            const messege = new Message({
                chat: chatData._id,
                sender: body.companyId,
                receiver: body.userId,
                messege: body.messege
            })
            const messageData = await messege.save()

            const chatUpdate = await Chat.findByIdAndUpdate(
                { _id: chatData._id },
                {
                    timestamp:Date.now(),
                    $push: { messages: messageData._id }
                }
            )
        }

        return res.status(200).json({
            success: true
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Wrong',
            error
        })
    }

}

// Here Create New Chat
const createNewChat = async (req, res) => {
    try {
        const { userId, companyId } = req.body
        const chatData = await Chat.find({
            participants: {
                $all: [companyId, userId]
            }
        })


        if (chatData.length > 0) {
            console.log(chatData[0]._id);

            return res.status(200).json({
                success: true,
                messege: 'success',
                chatId: chatData[0]._id
            })
        } else {
            const chat = new Chat({
                participants: [userId, companyId],
            })
            const chatData = await chat.save()

            return res.status(200).json({
                success: true,
                messege: 'success',
                chatId: chatData._id
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Wrong',
            error
        })
    }
}

module.exports = {
    getUsers, createNewMessege, getMesseges, createNewChat
}