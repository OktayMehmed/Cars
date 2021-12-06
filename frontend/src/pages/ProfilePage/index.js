import { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getUserDetails } from "../../actions/User";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(user)

  console.log(userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      // DISPATCH UPDATE PROFILE
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
          <h2 className="user-form-title">User Profile</h2>
          <form onSubmit={submitHandler} className="user-form">
            <article className="user-form-name">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </article>
            <article className="user-form-email">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </article>
            <article className="user-form-password">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </article>
            <article className="user-form-password">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </article>
            <button className="user-form-btn">Update</button>
          </form>
        </section>
      )}
    </>
  );
};

export default ProfilePage;
