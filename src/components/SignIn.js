// react
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { signIn } from "../actions/sign";
import { initQuestions } from "../actions/question";

// firebase - auth
import app, { auth } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

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
  const [error, setError] = useState({ target: null, message: "" });

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

  const handleSignInState = (target, value) => {
    setSignInState({ ...signInState, [target]: value });
  };

  const handleSignInError = (err) => {
    const code = err.code;
    switch (code) {
      case "auth/user-not-found":
        setError({ target: "email", message: "존재하지 않는 이메일 입니다." });
        return;
      case "auth/wrong-password":
        setError({
          target: "password",
          message: "비밀번호가 일치하지 않습니다.",
        });
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
        // fetch 먼저
        fetchQuestions();
        const user = userCredential.user;
        dispatch(signIn(user.displayName));
        navigate("/");
      })
      .catch((err) => {
        handleSignInError(err);
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
            placeholder={state === "confirm" ? "confirm password" : state}
            onChange={(e) => handleSignInState(state, e.target.value)}
            value={signInState[state]}
            required
          />
          {/* TODO: bar icon */}
          <p>{state === error.target ? error.message : ""}</p>
        </div>
      ))}

      <button>로그인</button>

      <div>
        아직 회원이 아니신가요?<Link to={"/signup"}>회원가입</Link>
      </div>
    </form>
  );
};

export default SignIn;
