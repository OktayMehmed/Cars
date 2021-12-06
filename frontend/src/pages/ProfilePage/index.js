import { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { getUserDetails, updateUserProfile } from "../../actions/User";

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

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: "USER_UPDATE_RESET" });
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, navigate, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
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
