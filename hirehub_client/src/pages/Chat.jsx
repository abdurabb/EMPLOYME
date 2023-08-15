import React, { useEffect, useState } from 'react'
import UserHeader from '../components/User/UserHeader'
import jwtDecode from 'jwt-decode';
import { UserApi } from '../Api/UserApi'
import io from 'socket.io-client';

function Chat() {

  const [userId, setUserId] = useState()// here storing the user or reciever Id
  const [chats, setChats] = useState([])// storing the all chatList here (side bar users list)
  const [companyId, setCompanyId] = useState() // here storing the chat id
  const [company, setCompany] = useState() // here the user details (he chated with the company)
  const [chatMesseges, setChatMesseges] = useState([]) // here storing the chat messeges
  const [messege, setMessege] = useState('') // here sending the new messege
  const [chatId, setChatId] = useState() // here storing the chat id
  const [arrivalMessege, setArrivalMessege] = useState()

  const socket = io.connect(process.env.REACT_APP_SERVER_URL);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setArrivalMessege({
        senderId: data.senderId,
        content: data.content,
        createdAt: Date.now()
      })
    });
  }, [socket]);

  useEffect(() => {
    if (arrivalMessege) {
      handleChat(chatId)
      // setChatMesseges((prev) => [...prev, arrivalMessege.content])
    }
  }, [arrivalMessege])


  useEffect(() => {
    let token = localStorage.getItem('UserToken')
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        const id = decodedToken.id
        setUserId(id)
        // Getting all Chat List of Users
        UserApi.get(`/companyDataList?id=${id}`).then((res) => {
          setChats(res.data.chatCompanyData)
        }).catch((err) => {
          console.log(err + 'userDataListing side');
        })
      }
    }
  }, [arrivalMessege])

  const handleChat = (id) => {
    UserApi.get(`/chatMesseges?id=${id}`).then((res) => {
      setChatMesseges(res.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  const messegeSendHandle = () => {
    if (messege.trim() === '') {
      return;
    }

    UserApi.post('/createNewMessege', { messege, companyId, userId, chatId }).then((res) => {
      console.log(res);
      setMessege('')
    }).catch((err) => {
      console.log(err);
    })


    socket.emit('send_message', {
      message: messege,
      senderId: userId,
      reciverId: companyId,
    });
  }

  return (
    <div>
      <UserHeader />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 border-r p-4">
          <div className='mt-4 p-4'>

          </div>
          {chats.map((chat) => (
            <div className="hover:bg-gray-300 p-2 rounded-xl cursor-pointer ">

              <div onClick={() => {
                setChatId(chat.chatId)
                setCompanyId(chat.companyId)
                setCompany(chat.company)
                handleChat(chat.chatId)
              }}>
                <div className='flex '>
                  <div>
                    <img src={chat.company.image} className='h-12 w-12 rounded-xl mr-4' alt="" />
                  </div>
                  <div className='ml-4'>
                    <h4 className=" flex items-center font-semibold">{chat.company.companyName}</h4>
                    <p className=" text-sm text-gray-500">{chat.lastMessege}</p>
                  </div>

                </div>

              </div>




            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-grow   ">
          {company ?
            < div className="flex flex-col  h-screen">
              <div className=' flex justify-center mt-4' >
                <div className=' w-[75%] bg-gray-300 text-white h-[88px] rounded-full '>
                  <div className='flex ml-14 mt-4'>
                    <div>
                      <img src={company.image} className='h-12 rounded-full w-12 h-12 ' alt="" />
                    </div>
                    <div className='ml-4 flex items-center'>
                      <h4 className=" font-semibold text-black">{company.companyName}</h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat messages */}
              <div className="flex-grow p-4 overflow-scroll ">
                {/* Render chat messages here */}
                {chatMesseges.map((messege) => {
                  return (
                    <>
                      {console.log(userId)}

                      <div className={`h-[80px] w-[300px] bg-gray-200 rounded-b-lg rounded-tr-xl m-2 p-4 ${messege.sender === userId ? 'ml-auto' : ''} `}>
                        {messege.messege}
                      </div>
                      {/* <div className='h-[80px] w-[300px] bg-gray-400 rounded-b-lg rounded-tr-xl m-2 ml-auto p-4'>{messege.messege}</div> */}
                    </>
                  )

                })}
              </div>

              {/* Message input */}
              <div className=" flex ml-2 mr-2 bg-gray-200 p-4 ">
                <input
                  type="text"
                  value={messege}
                  onChange={(e) => {
                    setMessege(e.target.value)
                  }}
                  className="w-full rounded-full py-2 px-4 border focus:outline-none focus:border-blue-500"
                  placeholder="Type your message..."
                />
                <button className='bg-green-500 rounded-xl p-2 ml-2' onClick={messegeSendHandle}>Send</button>
              </div>
            </div>

            : ''}

        </div>
      </div>
    </div >
  )
}

export default Chat
