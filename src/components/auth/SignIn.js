// react
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { signIn } from "../../actions/sign";
import { initQuestions } from "../../actions/question";

// firebase - auth
import app, { auth } from "../../firebase";
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
`;

const GoHomeLink = {
  display: "block",
  padding: "0.75rem",
  fontSize: "1.4rem",
  fontWeight: "900",
  color: "rgba(25, 52, 70, 0.8)",
  textDecoration: "none",
};

const Header = styled.h1`
  margin-top: 6.25rem;
  margin-bottom: 9.375rem;
  font-size: 2.5rem;
  font-weight: 900;
  color: ${(props) => props.theme.font_white};
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    margin-bottom: 6.25rem;
  }
`;

const InputField = styled.div`
  height: 7rem;
  width: 50%;
  min-width: 12.5rem;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    height: 5rem;
    width: 60%;
  }
`;

const Label = styled.label`
  display: none;
`;

const Input = styled.input`
  width: 100%;
  padding-left: 0.2rem;
  padding-bottom: 0.3rem;
  margin-bottom: 10px;
  border: initial;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 1.5rem;
  background: transparent;
  &::placeholder {
    color: rgba(128, 128, 128, 0.4);
  }
  // webkit 브라우저에서 자동완성 시 배경 색이 변하는 것 방지
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${(props) => props.theme.bg_basic} inset;
  }
  // TODO: 삼성 브라우저에서도 자동완성 색 변경 되는지 확인
  &:autofill {
    box-shadow: 0 0 0 1000px ${(props) => props.theme.bg_basic} inset;
  }

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    font-size: 1rem;
  }
`;

const Error = styled.p`
  font-size: 0.7rem;
  padding-left: 0.2rem;
  color: red;
`;

const Button = styled.button`
  display: block;
  height: 3.125rem;
  width: 50%;
  min-width: 12.5rem;
  border: 4px solid rgba(235, 236, 237, 0.4);
  border-radius: 8px;
  margin: 1rem auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => (props.disabled ? "" : props.theme.accent)};
  background: transparent;
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: ${(props) => props.theme.tablet}) {
    width: 60%;
    font-size: 1.2rem;
  }
`;

const ToSignUp = styled.p`
  margin-top: 3rem;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.font_white};
  text-align: center;
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
      <Link to={"/"} style={GoHomeLink}>
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
        아직 회원이 아니신가요?{" "}
        <Link to={"/signup"} style={ToSignUpLink}>
          회원가입
        </Link>
      </ToSignUp>
    </SignInForm>
  );
};

export default SignIn;
