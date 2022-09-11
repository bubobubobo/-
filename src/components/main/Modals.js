import { useNavigate } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";

// style
import styled from "styled-components";
import { resetQuestion } from "../../actions/question";

//////////////////////////////////////////////////////////////////////
// styles
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.font_modal};
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ReqText = styled.p`
  display: block;
  ${(props) => props.theme.absoluteCenter};
`;

const Nav = styled.button`
  width: 25%;
  ${(props) => props.theme.absoluteCenter};
  border: initial;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 2.2rem;
  background: ${(props) => props.theme.bg_main};
  transform: translate3d(-50%, 300%, 0);
  color: ${(props) => props.theme.font_modal};
  &:hover {
    box-shadow: 2px 2px 2px black;
  }
  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    width: calc(0.25 * 700px);
  }
`;

const StyledFinishModal = styled.div`
  margin-top: 1rem;
  font-size: 1.2em;
  font-weight: 500;
  color: ${(props) => props.theme.accent};
`;

const ResetButton = styled.button`
  display: block;
  width: 9rem;
  margin: 1.5rem auto;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 2rem;
  color: ${(props) => props.theme.font_white};
  border: initial;
  border-radius: 8px;
  background: ${(props) => props.theme.bg_basic};
  box-shadow: 2px 2px 2px gray;
  &:hover {
    box-shadow: 4px 4px 4px gray;
  }
`;
//////////////////////////////////////////////////////////////////////

const ReqSignInModal = () => {
  const navigate = useNavigate();

  const handleReqSignIn = () => {
    navigate("/signin");
  };

  return (
    <Modal>
      <ReqText>먼저 로그인 해주시기 바랍니다.</ReqText>
      <Nav onClick={handleReqSignIn}>로그인 하러 가기</Nav>
    </Modal>
  );
};

const FinishModal = ({ setFinish }) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    setFinish(false);
    dispatch(resetQuestion());
  };

  return (
    <StyledFinishModal>
      <p>🎉모든 문제를 푸셨습니다!🎉</p>
      <ResetButton onClick={handleReset}>초기화 하기</ResetButton>
    </StyledFinishModal>
  );
};

const SuccessModal = (props) => {
  return (
    <Modal>
      <ReqText>계정 생성이 완료되었습니다.</ReqText>
      <Nav onClick={props.signInAfterSignUp}>면접 보러 가기</Nav>
    </Modal>
  );
};

export { ReqSignInModal, FinishModal, SuccessModal };
