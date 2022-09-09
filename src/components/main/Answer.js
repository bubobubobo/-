import { useSelector } from "react-redux";

const Answer = () => {
  const { question } = useSelector((state) => state);
  const { selected } = question;

  return <div>{selected.length ? selected[0]["answer"] : null}</div>;
};

export default Answer;
