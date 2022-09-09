import { useNavigate } from "react-router-dom";

const ReqSignInModal = () => {
  const navigate = useNavigate();

  const handleReqSignIn = () => {
    navigate("/signin");
  };

  return (
    <>
      <p>먼저 로그인 해주시기 바랍니다.</p>
      <button onClick={handleReqSignIn}>로그인 하러 가기</button>
    </>
  );
};

const FinishModal = () => {
  return <>모든 문제를 푸셨습니다!</>;
};

export { ReqSignInModal, FinishModal };
