const SuccessModal = (props) => {
  return (
    <div>
      계정 생성이 완료되었습니다.
      <button onClick={props.signInAfterSignUp}>면접 보러 가기</button>
    </div>
  );
};

export default SuccessModal;
