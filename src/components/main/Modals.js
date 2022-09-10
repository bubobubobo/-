import { useNavigate } from "react-router-dom";

// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const Modal = styled.div`
  position: absolute;
  text-align: center;
  gap: 100px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 1.5em;
  font-weight: 600;
  color: ${(props) => props.theme.font_modal};
  background: rgba(0, 0, 0, 0.5);
`;

const ReqText = styled.p`
  display: block;
  margin-top: 25%;
`;

const Nav = styled.button`
  margin-top: 10%;
  border: initial;
  width: 22%;
  height: 4%;
  border-radius: 5px;
  font-size: 0.8em;
  font-weight: 600;
  background: ${(props) => props.theme.bg_main};
  color: ${(props) => props.theme.font_modal};
  &:hover {
    box-shadow: 2px 2px 2px black;
  }
`;

const StyledFinishModal = styled.p`
  margin-top: 1em;
  font-size: 1.2em;
  font-weight: 500;
  color: ${(props) => props.theme.accent};
`;

// const StyledFinishModal =
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

const FinishModal = () => {
  return <StyledFinishModal>모든 문제를 푸셨습니다!🎉</StyledFinishModal>;
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
