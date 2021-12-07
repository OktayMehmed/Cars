import { useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyCars } from "../../actions/Cars";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import MyCars from "../../components/MyCars";

const MyCarsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myCars = useSelector((state) => state.myCars);
  const { loading, cars, error } = myCars;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(listMyCars());
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <section className="my-cars">
          {cars.map((car) => (
            <MyCars key={car._id} car={car} />
          ))}
        </section>
      )}
    </>
  );
};

export default MyCarsPage;
