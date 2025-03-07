import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "./utils/Socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "./utils/Constants";
import axios from "axios";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);
  const { targetUserId } = useParams();

  const user = useSelector((state) => state.user.value);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // as soon as the page loads , the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + ":" + text);
      setMessage((preve)=>[...preve,{firstName,text}]);
      setNewMessage('')
    });

    return () => {
      socket.disconnect();
    };

  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
  };

  const fetchChat = async ()=>{
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`,{
        withCredentials : true
    })
    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg)=>{
        const {senderId,text} = msg
        return{
          firstName: senderId?.firstName,lastName:senderId?.lastName,text: text
        }
    })
    setMessage(chatMessages)
  }

  useEffect(()=>{
     fetchChat()
  },[])

//   console.log(message);
// console.log(newMessage);

  return (
    <div className="pt-[4rem]">
      <div className="container mx-auto mt-5 border border-gray-300 h-full min-h-[70vh] p-4 relative">
        <h1 className="font-bold text-center text-lg">Chat</h1>
        <div className="max-h-[57vh] overflow-scroll">
          {message.map((msg,index) => {
            // console.log(msg);
            return (
              <div key={index} className="chat chat-start">
                <div className="chat-header">
                  {`${msg.firstName} ${msg.lastName}`}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-5">
          <div className="w-[15rem] p-1.5 flex gap-4 rounded-lg">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              type="text"
              placeholder="Accent"
              className="input input-accent"
            />
            <button
              onClick={sendMessage}
              className="bg-primary rounded-lg p-1.5"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
