const Chat = require('../../models/chatSchema')
const Message = require('../../models/Messege')
const Company = require('../../models/Company')

// Here Finding the companies chated withe them for print in sidebar 
const getCompanies = async (req, res) => {
    try {
        const userId = req.query.id;
        const chats = await Chat.find({
            participants: {
                $elemMatch: {
                    $in: [userId]
                }
            }
        }).sort({ timestamp: -1 })


        const chatCompanyData = await Promise.all(chats.map(async (chat) => {
            const receiverId = await chat.participants.find(member => member._id.toString() !== userId);
            const company = await Company.findById(receiverId);
            return { companyId: company._id, company: { image: company.Image, email: company.email, companyName: company.company_name }, chatId: chat._id, lastMessege: chat.lastMessege }
        }))

        return res.status(200).json({
            chatCompanyData
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

// here getting all messeges 
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

// here creating new Messeges

const createNewMessege = async (req, res) => {
    try {

        const body = req.body

        if (body.chatId) {
            const messege = new Message({
                chat: body.chatId,
                sender: body.userId,
                receiver: body.companyId,
                messege: body.messege
            })
            const messageData = await messege.save()

            const chatDataUpdate = await Chat.findByIdAndUpdate(
                { _id: body.chatId },
                {
                    timestamp: Date.now(),
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
                    timestamp: Date.now(),
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

// Here Creating the New Chat between user and company
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
    getCompanies, getMesseges, createNewMessege, createNewChat
}