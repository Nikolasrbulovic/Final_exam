import { useState } from "react";
import { useDispatch } from "react-redux";
import { performUserRegister } from "../store/user/slice";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectErrorMessage } from "../store/user/selectors";
const SignUp = () => {
  const error = useSelector(selectErrorMessage);

  const dispatch = useDispatch();
  const [terms, setTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!terms) {
      setMessage("Please accept the terms to proceed with registration.");
    } else {
      dispatch(performUserRegister(user));

      setUser({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-signin w-25 m-auto mt-5">
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="FirstName"
            name="first_name"
            placeholder="name@example.com"
            value={user.first_name}
            onChange={handleInputChange}
          />
          <label htmlFor="FirstName">First Name</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="LastName"
            name="last_name"
            placeholder="name@example.com"
            value={user.last_name}
            onChange={handleInputChange}
          />
          <label htmlFor="LastName">Last Name</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            id="Email"
            name="email"
            placeholder="name@example.com"
            value={user.email}
            onChange={handleInputChange}
          />
          <label htmlFor="Email">Email address</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password confirm"
            name="password_confirmation"
            value={user.password_confirmation}
            onChange={handleInputChange}
          />
          <label htmlFor="floatingPassword">Password confirm</label>
        </div>

        <div className="form-check text-start my-3 mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            value="terms"
            id="Terms"
            checked={terms}
            onChange={() => setTerms(!terms)}
          />
          <label className="form-check-label" htmlFor="Terms ">
            I accept terms and conditions
          </label>
        </div>
        <button className="btn btn-dark w-100 py-2 mt-3" type="submit">
          Sign up
        </button>
        {!terms && <p className="error-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </form>
  );
};

export default SignUp;
