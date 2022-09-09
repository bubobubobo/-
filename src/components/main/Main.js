// components
import Header from "./Header";
import HitMe from "./HitMe";
import StopWatch from "./StopWatch";
import Question from "./Question";
import Answer from "./Answer";

// redux
import { useSelector } from "react-redux";

const Main = () => {
  const { isSigned } = useSelector((state) => state.signed);

  return (
    <div>
      <Header />
      <HitMe />
      {!isSigned ? null : (
        <>
          <StopWatch />
          <Question />
          <Answer />
        </>
      )}
    </div>
  );
};

export default Main;
