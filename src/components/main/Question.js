import { useSelector } from "react-redux";

const Question = () => {
  const question = useSelector((state) => state.question);
  console.log(question);

  return <div>Question box</div>;
};

export default Question;
