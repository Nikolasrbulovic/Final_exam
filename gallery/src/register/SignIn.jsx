import { performUserLogin } from "../store/user/slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectErrorMessage } from "../store/user/selectors";
import { validateLoginForm } from "../validation/validation";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const reqestError = useSelector(selectErrorMessage);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const isFormValid = validateLoginForm({
      email,
      password,
      setErrors: setErrors,
    });
    if (isFormValid) {
      dispatch(
        performUserLogin({
          email,
          password,
          onSuccess: () => navigate("/"),
        })
      );
      setEmail("");
      setPassword("");
    } else {
      return;
    }
  };

  return (
    <div className="form-signin w-25 m-auto mt-5">
      <h3>Welcome to Sign in!</h3>
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
        {(errors || reqestError) && (
          <div>
            <p>{errors?.email}</p>
            <p>{errors?.password}</p>
            <p>{reqestError}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
