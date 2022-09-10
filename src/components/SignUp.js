// react
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";

// redux
import { useDispatch } from "react-redux";
import { signIn } from "../actions/sign";
import { initQuestions } from "../actions/question";

// firebase
import app, { auth } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// helper functions
import {
  isValidEmail,
  isValidNickName,
  isValidPassword,
  isValidConfirmPassword,
} from "./validation";

// firestore db
const db = getFirestore(app);
const ref = collection(db, "JS");

const SignUp = () => {
  // navigator
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();

  // local state
  const [signUpState, setSignUpState] = useState({
    email: "",
    nickname: "",
    password: "",
    confirm: "",
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [error, setError] = useState(
    Object.entries(signUpState).reduce(
      (obj, [key, value]) => ((obj[key] = value), obj),
      {}
    )
  );

  const [modal, setModal] = useState(false);

  // custom error messages
  const errMsg = {
    email: "이메일 형식에 맞춰 입력해주세요.",
    nickname: "별명은 공백제외 1글자 이상으로 작성해주세요.",
    password: "비밀번호는 공백제외 6~12자로 작성해주세요.",
    confirm: "입력한 비밀번호와 다릅니다.",
  };

  // signup info array
  const states = Object.keys(signUpState);

  // helper
  // TODO: signin과 signup에 중복해서 사용해야 하는 문제 => trouble shooting
  const fetchQuestions = async () => {
    const documents = await getDocs(ref);
    const questions = documents.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(initQuestions(questions));
  };

  // onChnage event마다 버튼 활성화 체크
  useEffect(() => {
    const { email, nickname, password, confirm } = signUpState;
    if (
      isValidEmail(email) &&
      isValidNickName(nickname) &&
      isValidPassword(password) &&
      isValidConfirmPassword(password, confirm)
    )
      setSignUpSuccess(true);
    else setSignUpSuccess(false);
  }, [signUpState]);

  const handleSignUpState = (target, value) => {
    setSignUpState({ ...signUpState, [target]: value });

    let targetState = null;
    if (target === "email") targetState = isValidEmail(value);
    if (target === "nickname") targetState = isValidNickName(value);
    if (target === "password") targetState = isValidPassword(value);
    if (target === "confirm")
      targetState = isValidConfirmPassword(signUpState.password, value);

    setError({ ...error, [target]: targetState ? "" : errMsg[target] });
  };

  const handleApiSignUpError = (err) => {
    const code = err.code;
    switch (code) {
      case "auth/user-not-found":
        setError({ ...error, email: "존재하지 않는 이메일입니다." });
        return;
      case "auth/email-already-in-use":
        setError({ ...error, email: "이미 존재하는 이메일입니다." });
        return;
      case "auth/weak-password":
        setError({
          ...error,
          password:
            "비밀번호는 공백을 제외하고 6자 이상, 12자 이하여야 합니다.",
        });
        return;
      default:
        return;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, nickname, password } = signUpState;

    // 계정 생성
    await createUserWithEmailAndPassword(auth, email, password)
      // signUp
      .then((userCredential) => {
        fetchQuestions();
        const user = userCredential.user;
        updateProfile(user, {
          displayName: nickname,
        });
        setModal(true);
      })
      .catch((err) => {
        if (!modal) handleApiSignUpError(err);
      });
  };

  const signInAfterSignUp = async () => {
    // 생성에 성공하면 자동 로그인
    const { email, password } = signUpState;
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        dispatch(signIn(user.displayName));
        navigate("/");
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
          <p>{error[state]}</p>
        </div>
      ))}
      <button disabled={signUpSuccess ? false : true}>회원가입</button>
      <div>
        이미 회원이신가요?<Link to={"/signin"}>로그인</Link>
      </div>
      {modal ? <SuccessModal signInAfterSignUp={signInAfterSignUp} /> : null}
    </form>
  );
};

export default SignUp;
