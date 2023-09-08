import React, { useEffect, useRef, useState } from 'react';
import CompanyHeader from '../../components/Company/CompanyHeader';
import { CompanyApi } from '../../Api/CompanyApi';
import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';

function CompanyChat() {
    const [chats, setChats] = useState([]);
    const [messege, setMessege] = useState('');
    const [companyId, setCompanyId] = useState();
    const [userId, setUserId] = useState();
    const [user, setUser] = useState();
    const [chatId, setChatId] = useState();
    const [chatMesseges, setChatMesseges] = useState([]);
    const [arrivalMessege, setArrivalMessege] = useState()
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Whenever messages are updated, scroll to the bottom
        scrollToBottom();
    }, [messege, arrivalMessege]);

    // Function to scroll chat container to the bottom
    function scrollToBottom() {
        if (chatContainerRef.current) {
            console.log('inside the scrooll');
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

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
            // setChatMesseges((prev) => [...prev, arrivalMessege])
            handleChat(chatId)
        }
    }, [arrivalMessege])

    const messegeSendHandle = () => {
        if (messege.trim() === '') {
            return;
        }

        CompanyApi.post('/createNewMessege', { messege, companyId, userId, chatId })
            .then((res) => {
                console.log(res);
                setMessege('');
            })
            .catch((err) => {
                console.log(err);
            });

        socket.emit('send_message', {
            message: messege,
            senderId: companyId,
            reciverId: userId,

        });
    };

    useEffect(() => {
        let token = localStorage.getItem('CompanyToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.id) {
                const id = decodedToken.id;
                setCompanyId(id);

                CompanyApi.get(`/userDataList?id=${id}`)
                    .then((res) => {
                        setChats(res.data.chatUserData);
                    })
                    .catch((err) => {
                        console.log(err + 'userDataListing side');
                    });
            }
        }
    }, [arrivalMessege]);

    const handleChat = (id) => {
        CompanyApi.get(`/chatMesseges?id=${id}`)
            .then((res) => {
                setChatMesseges(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Display The Date on The Messeges
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date >= today) {
            return 'Today';
        } else if (date >= yesterday) {
            return 'Yesterday';
        } else {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        }
    };


    return (
        <div>
            <CompanyHeader />
            <div className="flex h-screen">
                <div className="w-1/4 bg-gray-300 border-r p-4">
                    <div className='mt-4 p-4'>

                    </div>
                    <div className="text-gray-600">
                        {chats.map((chat) => (
                            <div className='hover:bg-gray-300 p-2 rounded-xl cursor-pointer' onClick={() => {
                                setChatId(chat.chatId);
                                setUserId(chat.userId);
                                setUser(chat.user);
                                handleChat(chat.chatId);
                                scrollToBottom();
                            }}>
                                <div className='flex' >
                                    <div>
                                        <img src={chat.user.image} className="h-12 w-12 rounded-xl mr-4" alt="" />
                                    </div>
                                    <div className='ml-4'>
                                        <h4 className="flex items-center font-semibold">{chat.user.first_name}</h4>
                                        <p className="text-sm text-gray-500">{chat.lastMessege}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-grow">
                    {user ?
                        <div className="flex flex-col h-screen">
                            <div className='flex justify-center mt-4'>
                                <div className='w-[75%] bg-gray-300 text-white h-[88px] rounded-full'>
                                    <div className='flex ml-14 mt-4'>
                                        <div>
                                            <img src={user.image} className='h-12 rounded-full w-12 h-12' alt="" />
                                        </div>
                                        <div className='ml-4 flex items-center'>
                                            <h4 className="font-semibold text-black">{user.first_name}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow p-4 overflow-scroll" id="chat-container" ref={chatContainerRef} >
                                {chatMesseges.map((messege, index) => {
                                    const date = new Date(messege.timestamp);
                                    const hours = date.getHours();
                                    const minutes = date.getMinutes();
                                    const ampm = hours >= 12 ? 'pm' : 'am';
                                    const hours12 = hours % 12 || 12;

                                    const displayDate = formatTimestamp(messege.timestamp);
                                    const shouldDisplayDate = index === 0 || displayDate !== formatTimestamp(chatMesseges[index - 1].timestamp);

                                    return (
                                        <>
                                            {shouldDisplayDate && (
                                                <div className="text-center text-gray-500 mt-2">{displayDate}</div>
                                            )}

                                            <div className={`h-[80px] w-[300px] bg-gray-200 rounded-b-lg rounded-tr-xl m-2 p-4 ${messege.sender === companyId ? 'ml-auto' : ''} `}>
                                                {messege.messege}
                                                <div className='text-end text-sm'>
                                                    {`${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            
                            <div className="flex ml-2 mr-2 bg-gray-300 p-4">
                                <input
                                    type="text"
                                    value={messege}
                                    onChange={(e) => {
                                        setMessege(e.target.value);
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
        </div>
    );
}

export default CompanyChat;
