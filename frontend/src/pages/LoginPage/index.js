import { useEffect } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../actions/User";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    dispatch(login(email, password));
  };

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (
        <Loader />
      ) : (
        <section className="user-form-container">
          <h2 className="user-form-title">Sign in</h2>
          <form onSubmit={submitHandler} className="user-form">
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
            <button className="user-form-btn">Sign In</button>
          </form>
          <p className="user-login-register">
            Don't have an account yet, click{" "}
            <Link to={"/register"} className="link-login-register">
              Register
            </Link>
            .
          </p>
        </section>
      )}
    </>
  );
};

export default LoginPage;
