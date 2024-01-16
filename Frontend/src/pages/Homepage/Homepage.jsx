import styles from "./Homepage.module.css";

import Message from "../../components/Message/Message";
import MessageForm from "../../components/MessageForm/MessageForm";
import AddButton from "../../components/AddButton/AddButton";

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
  const content = "Hello World!";
  const content2 = "lorem50dsaashdgashdgashdgajsdajsdjasgdasdadiuasd";
  return (
    <div className={mainDiv}>
      <Message content={content} highlightColor="var(--highlight)" />
      <Message content={content2} highlightColor="var(--highlight)" />
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
