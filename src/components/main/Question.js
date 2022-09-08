import { useSelector } from "react-redux";

const Question = () => {
  const { question, signed } = useSelector((state) => state);

  // TODO: select random question you coudn't study twodays becaus of me ㅜㅜ
  // nono I almost finished functions
  return <div>Question box</div>;
};

export default Question;
