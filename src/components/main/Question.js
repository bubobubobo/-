import { useSelector } from "react-redux";

const Question = () => {
  const { question } = useSelector((state) => state);
  const { selected } = question;

  // TODO: select random question you coudn't study twodays becaus of me ㅜㅜ
  // nono I almost finished functions
  return <div>{selected.length ? selected[0]["question"] : ""}</div>;
};

export default Question;
