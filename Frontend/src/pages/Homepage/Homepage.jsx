import styles from "./Homepage.module.css";

import Message from "../../components/Message/Message";
import AddButton from "../../components/AddButton/AddButton";

// CSS Styles
const { mainDiv, buttonDiv } = styles;

const Homepage = () => {
  const content = "Hello World!";
  const content2 = "lorem50dsaashdgashdgashdgajsdajsdjasgdasdadiuasd";
  return (
    <div className={mainDiv}>
      <Message content={content} highlightColor="var(--highlight)" />
      <Message content={content2} highlightColor="var(--highlight)" />
      <div className={buttonDiv}>
        <AddButton />
      </div>
    </div>
  );
};

export default Homepage;
