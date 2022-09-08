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
    <form onSubmit={handleSignIn}>
      <Link to={"/"}>SHOW ME</Link>

      <h1>SIGN IN</h1>

      {/* input containers */}
      {states.map((state, idx) => (
        <div key={idx}>
          <label htmlFor={`input_${state}`}>input {state}</label>
          <input
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

      <button disabled={signInSuccess ? false : true}>로그인</button>

      <div>
        아직 회원이 아니신가요?<Link to={"/signup"}>회원가입</Link>
      </div>
    </form>
  );
};

export default SignIn;
