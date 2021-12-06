import { useState, useEffect } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/User";

const RegisterPage = () => {
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { name, email, password, confirmPassword } =
      Object.fromEntries(formData);

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      dispatch(register(name, email, password));
      navigate("/");
    }
  };

  return (
    <>
      {message && <ErrorMessage>{message}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (
        <Loader />
      ) : (
        <section className="user-register-form-container">
          <h2 className="user-form-title">Create account</h2>
          <form onSubmit={submitHandler} className="user-form">
            <article className="user-form-name">
              <input type="text" name="name" id="name" placeholder="Username" />
            </article>
            <article className="user-form-email">
              <input type="text" name="email" id="email" placeholder="E-mail" />
            </article>
            <article className="user-form-password">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </article>
            <article className="user-form-password">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
            </article>
            <button className="user-form-btn">Sign up</button>
          </form>
          <p className="user-login-register">
            Have an Account?{" "}
            <Link to={"/login"} className="link-login-register">
              Sign in
            </Link>
            .
          </p>
        </section>
      )}
    </>
  );
};

export default RegisterPage;
