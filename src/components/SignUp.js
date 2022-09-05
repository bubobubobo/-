// react
import { useState } from "react";
import { Link } from "react-router-dom";
import SuccessModal from "./SuccessModal";

// redux
import { useDispatch } from "react-redux";
import { signIn } from "../actions/sign";

// firebase - auth
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const SignUp = () => {
  // local state
  const [signUpState, setSignUpState] = useState({
    email: "",
    nickname: "",
    password: "",
    confirm: "",
  });
  const [modal, setModal] = useState(false);
  const [error, setError] = useState({ target: null, message: "" });

  // dispatch
  const dispatch = useDispatch();

  // signup info array
  const states = Object.keys(signUpState);

  // helper
  const handleSignUpState = (target, value) => {
    setSignUpState({ ...signUpState, [target]: value });
  };

  const handleSignUpError = (err) => {
    const code = err.code;
    switch (code) {
      case "auth/email-already-in-use":
        setError({ target: "email", message: "이미 존재하는 이메일입니다." });
        return;
      case "auth/weak-password":
        setError({
          target: "password",
          message: "비밀번호는 양 끝 공백을 제외한 6자리 이상이어야 합니다.",
        });
        return;
      default:
        return;
    }
  };

  // 빈 문자열만 아니면 됨.
  const isValidNickName = (nickname) => !!nickname.trim();

  // 동일해야 함.
  const isValidConfirmPassword = (password, confirm) =>
    password.trim() === confirm.trim();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, nickname, password, confirm } = signUpState;

    // TODO: Error의 순서를 고려해 error handling 할 좋은 방법을 찾을 것.
    if (!isValidNickName(nickname)) {
      setError({ target: "nickname", message: "사용할 수 없는 별명입니다." });
      throw new Error("invalid-nickname");
    }
    if (!isValidConfirmPassword(password, confirm)) {
      setError({ target: "confirm", message: "비밀번호와 일치하지 않습니다." });
      throw new Error("wrong-confirm-password");
    }

    // 계정 생성
    await createUserWithEmailAndPassword(auth, email, password.trim())
      // signUp
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: nickname,
        });
      })
      .catch((err) => {
        handleSignUpError(err);
      });

    // 생성에 성공하면 자동 로그인
    await signInWithEmailAndPassword(auth, email, password.trim()).then(
      (userCredential) => {
        const user = userCredential.user;
        dispatch(signIn(user.displayName));
        setModal(true);
      }
    );
  };

  // SignUp template
  return (
    <form onSubmit={handleSignUp}>
      <Link to={"/"}>SHOW ME</Link>
      <h1>SIGN UP</h1>
      {/* input containers */}
      {states.map((state, idx) => (
        <div key={idx}>
          <label htmlFor={`input_${state}`}>
            input {state === "confirm" ? "confirm password" : state}
          </label>
          <input
            id={`input_${state}`}
            type={state === "confirm" ? "password" : state}
            placeholder={state}
            onChange={(e) => handleSignUpState(state, e.target.value)}
            value={signUpState[state]}
            required
          />
          {/* TODO: bar icon */}
          <p>{state === error.target ? error.message : ""}</p>
        </div>
      ))}
      <button>회원가입</button>
      <div>
        이미 회원이신가요?<Link to={"/signin"}>로그인</Link>
      </div>
      {modal ? <SuccessModal /> : null}
    </form>
  );
};

export default SignUp;
