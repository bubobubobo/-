// redux
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewQuestion } from "../../actions/question";

import { ReqSignInModal, FinishModal } from "./Modals";

// style
import styled, { keyframes } from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
// shaking animation : https://css-tricks.com/snippets/css/shake-css-keyframe-animation/
const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const StyledHitMe = styled.button`
  margin-top: 3.75rem;
  margin-bottom: 1.875rem;
  font-size: 6rem;
  font-weight: 700;
  color: ${(props) => props.theme.font_white};
  text-shadow: 4px 4px 4px gray;
  background: transparent;
  border: initial;
  &:hover {
    animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    font-size: 3rem;
  }
`;
//////////////////////////////////////////////////////////////////////

const HitMe = ({ setIsOpened }) => {
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
    if (questionList.length) {
      dispatch(getNewQuestion(idx));
      setIsOpened(false);
    } else setFinish(true);
  };

  return (
    <>
      <StyledHitMe onClick={handleHitMe}>Hit me!</StyledHitMe>
      {modal ? <ReqSignInModal /> : null}
      {finish ? <FinishModal setFinish={setFinish} /> : null}
    </>
  );
};

export default HitMe;
