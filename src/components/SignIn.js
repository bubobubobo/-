// react
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { signIn } from "../actions/sign";
import { initQuestions } from "../actions/question";

// firebase - auth
import app, { auth } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// helper functions
import { isValidEmail, isValidPassword } from "./validation";

// style
import styled from "styled-components";

//////////////////////////////////////////////////////////////////////
// styles
const SignInForm = styled.form`
  background: ${(props) => props.theme.bg_basic};
  height: 100vh;
`;

const LinkStyle = {
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
  color: ${(props) => props.theme.accent};
  background: transparent;
  border: 4px solid rgba(235, 236, 237, 0.4);
  border-radius: 8px;
`;

const ToSignUp = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: ${(props) => props.theme.font_white};
`;

const ToSignUpLink = {
  color: "#4C586F",
};
//////////////////////////////////////////////////////////////////////

// firestore db
const db = getFirestore(app);
const ref = collection(db, "JS");

const SignIn = () => {
  // navigator
  const navigate = useNavigate();
  // dispatcher
  const dispatch = useDispatch();

  // local state
  const [signInState, setSignInState] = useState({ email: "", password: "" });
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [error, setError] = useState(
    Object.entries(signInState).reduce(
      (obj, [key, value]) => ((obj[key] = value), obj),
      {}
    )
  );

  // custom error messages
  const errMsg = {
    email: "이메일 형식에 맞춰 입력해주세요.",
    password: "비밀번호는 공백제외 6~12자로 작성해주세요.",
  };

  // signin info array
  const states = Object.keys(signInState);

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

  // onChange event마다 버튼 활성화 체크
  useEffect(() => {
    const { email, password } = signInState;
    if (isValidEmail(email) && isValidPassword(password))
      setSignInSuccess(true);
    else setSignInSuccess(false);
  }, [signInState]);

  const handleSignInState = (target, value) => {
    setSignInState({ ...signInState, [target]: value });

    let targetState = null;
    if (target === "email") targetState = isValidEmail(value);
    if (target === "password") targetState = isValidPassword(value);

    setError({ ...error, [target]: targetState ? "" : errMsg[target] });
  };

  const handleApiSignInError = (err) => {
    const code = err.code;
    switch (code) {
      case "auth/user-not-found":
        setError({ ...error, email: "존재하지 않는 이메일 입니다." });
        return;
      case "auth/wrong-password":
        setError({ ...error, password: "비밀번호가 일치하지 않습니다." });
        return;
      default:
        return;
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = signInState;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인에 성공하면 질문들을 fetch하고 메인 페이지로 넘어감
        fetchQuestions();
        const user = userCredential.user;
        dispatch(signIn(user.displayName));
        navigate("/");
      })
      .catch((err) => {
        handleApiSignInError(err);
      });
  };

  // SignIn template
  return (
    <SignInForm onSubmit={handleSignIn}>
      <Link to={"/"} style={LinkStyle}>
        SHOW ME
      </Link>

      <Header>SIGN IN</Header>
      {/* <h1>SIGN IN</h1> */}

      {/* input containers */}
      {states.map((state, idx) => (
        <InputField key={idx}>
          <Label htmlFor={`input_${state}`}>input {state}</Label>
          <Input
            id={`input_${state}`}
            type={state}
            placeholder={state}
            onChange={(e) => {
              handleSignInState(state, e.target.value);
            }}
            value={signInState[state]}
            required
          />
          {/* TODO: bar icon */}
          <Error>{error[state]}</Error>
        </InputField>
      ))}

      <Button disabled={signInSuccess ? false : true}>로그인</Button>

      <ToSignUp>
        아직 회원이 아니신가요?
        <Link to={"/signup"} style={ToSignUpLink}>
          회원가입
        </Link>
      </ToSignUp>
    </SignInForm>
  );
};

export default SignIn;
