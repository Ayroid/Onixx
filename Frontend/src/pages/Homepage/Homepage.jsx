import styles from "./Homepage.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Message from "../../components/Message/Message";
import MessageForm from "../../components/MessageForm/MessageForm";
import AddButton from "../../components/AddButton/AddButton";

import useFetch from "../../hooks/useFetch";

// CSS Styles
const { mainDiv, messages, buttonDiv, messageForm } = styles;

const toggleMessageForm = () => {
  const messageForm = document.getElementById("messageForm");
  if (messageForm.style.display === "flex") {
    messageForm.style.display = "none";
    return;
  }
  messageForm.style.display = "flex";
};

const Homepage = () => {
  const { data, loading } = useFetch({
    url: "http://192.168.1.9:3000/api/message/",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={mainDiv}>
      <Navbar />
      <div className={messages}>
        {data == null ? (
          <div>No Secrets? Strange...</div>
        ) : (
          data.map((message) => (
            <Message
              key={message._id}
              heading={message.heading}
              content={message.content}
              highlightColor={
                message._id === localStorage.getItem("messageId")
                  ? "var(--highlight)"
                  : null
              }
            />
          ))
        )}
      </div>
      <div className={messageForm} id="messageForm">
        <MessageForm buttonText="Post" closeForm={toggleMessageForm} />
      </div>
      <div className={buttonDiv} onClick={toggleMessageForm}>
        <AddButton />
      </div>
    </div>
  );
};

export default Homepage;
