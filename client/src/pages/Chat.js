import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import styles from "./Chat.module.css";

let socket;
export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const loadMessages = () => {
    socket.on("messages", (data) => {
      setMessages(data);
      const chatMessagesElm = document.getElementById("chat-messages");
      chatMessagesElm.scrollTop = chatMessagesElm.scrollHeight;
    });
  };
  useEffect(() => {
    socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    loadMessages();
    return () => {
      socket.disconnect();
    };
  }, []);

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    loadMessages();
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.messagesHeader}>
        <h1>Simple Message</h1>
      </div>
      <div className={styles.messages} id="chat-messages">
        {messages.length > 0 && (
          <div className={styles.messagesBody}>
            {messages.map((item) => (
              <div key={item.id} className={styles.messagesItem}>
                <div>
                  <span></span>
                  <p className={styles.message}>{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {messages.length < 1 && <p>Let's write your first message</p>}
      </div>
      <form onSubmit={submitHandler}>
        <input
          placeholder="your message"
          value={message}
          onChange={messageHandler}
          type="text"
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
