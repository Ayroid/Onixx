import styles from "./Homepage.module.css";

import Message from "../../components/Message/Message";
import MessageForm from "../../components/MessageForm/MessageForm";
import AddButton from "../../components/AddButton/AddButton";

import useFetch from "../../hooks/useFetch";

// CSS Styles
const { mainDiv, buttonDiv, messageForm } = styles;

const toggleMessageForm = () => {
  const messageForm = document.getElementById("messageForm");
  if (messageForm.style.display === "flex") {
    messageForm.style.display = "none";
    return;
  }
  messageForm.style.display = "flex";
};

const Homepage = () => {
  const { data, loading, error } = useFetch({
    url: "http://192.168.1.9:3000/api/message/",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={mainDiv}>
      {data.map((message) => (
        <Message
          key={message._id}
          heading={message.heading}
          content={message.content}
          highlightColor="var(--highlight)"
        />
      ))}
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
