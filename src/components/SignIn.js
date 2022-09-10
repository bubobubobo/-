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
  padding: none;
  margin: none;
  background: #cbc5c1;
  height: 100vh;
`;

const LinkStyle = {
  textDecoration: "none",
  fontSize: "1.5em",
  fontWeight: "600",
  color: "#193446",
};

const Header = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #ebeced;
`;

const Label = styled.label`
  display: none;
`;

const Input = styled.input`
    display: block;
    border: initial;
    background: #cbc5c1;
    color: rgba(128, 128, 128, 0.4)
    margin: 10px auto;
  `;

const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: 4px solid rgba(235, 236, 237, 0.4);
  border-radius: 8px;
`;

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
        <div key={idx}>
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
          <p>{error[state]}</p>
        </div>
      ))}

      <Button disabled={signInSuccess ? false : true}>로그인</Button>

      <div>
        아직 회원이 아니신가요?<Link to={"/signup"}>회원가입</Link>
      </div>
    </SignInForm>
  );
};

export default SignIn;
