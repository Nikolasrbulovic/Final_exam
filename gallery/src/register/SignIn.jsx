import { performUserLogin } from "../store/user/slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(performUserLogin({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <div className="form-signin w-25 m-auto mt-5">
      <form onSubmit={submitHandler}>
        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            id="Email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlfor="Email">Email address</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-dark w-100 py-2 mt-3" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignIn;
