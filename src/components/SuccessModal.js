import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SuccessModal = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const { isSigned } = useSelector((state) => state.signed);
  console.log(isSigned);
  return (
    <div>
      계정 생성이 완료되었습니다.
      <button onClick={goToHome}>면접 보러 가기</button>
    </div>
  );
};

export default SuccessModal;
