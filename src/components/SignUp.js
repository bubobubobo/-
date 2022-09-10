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

// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const SignUpForm = styled.form`
  background: ${(props) => props.theme.bg_basic};
  height: 100vh;
`;

const GoHomeLink = {
  textDecoration: "none",
  fontSize: "1.5em",
  fontWeight: "700",
  color: "#193446",
};

const Header = styled.h1`
  font-size: 2.5em;
  font-weight: 900;
  text-align: center;
  color: ${(props) => props.theme.font_white};
  margin-top: 100px;
  margin-bottom: 150px;
`;

const InputField = styled.div`
  height: 100px;
  width: 50%;
  min-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const Label = styled.label`
  display: none;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 10px;
  padding-left: 0.2em;
  border: initial;
  border-bottom: 1px solid black;
  width: 100%;
  outline: none;
  background: transparent;
  &::placeholder {
    color: rgba(128, 128, 128, 0.4);
  }
  // webkit 브라우저에서 자동완성 시 배경 색이 변하는 것 방지
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${(props) => props.theme.bg_basic} inset;
  }
`;

const Error = styled.p`
  font-size: 0.7em;
  padding-left: 0.2em;
  color: red;
`;

const Button = styled.button`
  display: block;
  height: 50px;
  width: 50%;
  min-width: 300px;
  margin: 0 auto 20px;
  font-size: 1.2em;
  font-weight: 700;
  color: ${(props) => (props.disabled ? "" : props.theme.accent)};
  background: transparent;
  border: 4px solid rgba(235, 236, 237, 0.4);
  border-radius: 8px;
`;

const ToSignIn = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: ${(props) => props.theme.font_white};
`;

const ToSignInLink = {
  color: "#4C586F",
};

//////////////////////////////////////////////////////////////////////

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
        // 로그인 불가능한 상태일 때만 체크!
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
    <SignUpForm onSubmit={handleSignUp}>
      <Link to={"/"} style={GoHomeLink}>
        SHOW ME
      </Link>
      <Header>SIGN UP</Header>
      {/* input containers */}
      {states.map((state, idx) => (
        <InputField key={idx}>
          <Label htmlFor={`input_${state}`}>
            input {state === "confirm" ? "confirm password" : state}
          </Label>
          <Input
            id={`input_${state}`}
            type={state === "confirm" ? "password" : state}
            placeholder={state}
            onChange={(e) => handleSignUpState(state, e.target.value)}
            value={signUpState[state]}
            required
          />
          {/* TODO: bar icon */}
          <Error>{error[state]}</Error>
        </InputField>
      ))}
      <Button disabled={signUpSuccess ? false : true}>회원가입</Button>
      <ToSignIn>
        이미 회원이신가요?
        <Link to={"/signin"} style={ToSignInLink}>
          로그인
        </Link>
      </ToSignIn>
      {modal ? <SuccessModal signInAfterSignUp={signInAfterSignUp} /> : null}
    </SignUpForm>
  );
};

export default SignUp;
