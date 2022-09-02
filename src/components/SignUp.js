import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <form>
      <Link to={"/"}>SHOW ME</Link>
      <h1>SIGN UP</h1>
      {/* input container */}
      <div>
        <label htmlFor="input_email">input email</label>
        <input id="input_email" type="email" placeholder="email" required />
        {/* TODO: bar icon */}
        {/* TODO: show error msg */}
      </div>
      <div>
        <label htmlFor="input_nickname">input nickname</label>
        <input
          id="input_nickname"
          type="text"
          placeholder="nickname"
          required
        />
        {/* TODO: bar icon */}
        {/* TODO: show error msg */}
      </div>
      <div>
        <label htmlFor="input_password">input password</label>
        <input
          id="input_password"
          type="text"
          placeholder="password"
          required
        />
        {/* TODO: bar icon */}
        {/* TODO: show error msg */}
      </div>
      <div>
        <label htmlFor="input_confirmpassword">input confirm password</label>
        <input
          id="input_confirmpassword"
          type="text"
          placeholder="confirmpassword"
          required
        />
        {/* TODO: bar icon */}
        {/* TODO: show error msg */}
      </div>
      <button>회원가입</button>
      <div>
        이미 회원이신가요?<Link to={"/signin"}>로그인</Link>
      </div>
    </form>
  );
};

export default SignUp;
