// redux
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewQuestion } from "../../actions/question";

import { ReqSignInModal, FinishModal } from "./Modals";

const HitMe = () => {
  const { question, signed } = useSelector((state) => state);
  const { questionList } = question;
  const { isSigned } = signed;

  const [modal, setModal] = useState(false);
  const [finish, setFinish] = useState(false);

  const dispatch = useDispatch();

  // helper
  const generateRandomIdx = () =>
    Math.floor(Math.random() * questionList.length);

  const handleHitMe = () => {
    if (!isSigned) return setModal(true);

    const idx = generateRandomIdx();
    if (questionList.length) dispatch(getNewQuestion(idx));
    else setFinish(true);
  };

  return (
    <>
      <button onClick={handleHitMe}>Hit me!</button>
      {modal ? <ReqSignInModal /> : null}
      {finish ? <FinishModal /> : null}
    </>
  );
};

export default HitMe;
