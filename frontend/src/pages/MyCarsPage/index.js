import { useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { listMyCars, carDelete } from "../../actions/Cars";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const MyCarsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myCars = useSelector((state) => state.myCars);
  const { loading, cars, error } = myCars;

  const deleteCar = useSelector((state) => state.deleteCar);
  const { error: deleteError, success: deleteSuccess } = deleteCar;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(listMyCars());
  }, [dispatch, userInfo, navigate, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(carDelete(id));
    }
  };

  return (
    <>
      {deleteError && <ErrorMessage>{deleteError}</ErrorMessage>}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <section className="my-cars">
          {cars.map((car) => (
            <article className="my-car" key={car._id}>
              <img className="my-car-img" src={ "http://localhost:8000" + car.image} alt={car.make} />

              <article className="my-car-info">
                <h1 className="my-car-title">
                  {car.make} {car.model}
                </h1>
                <article className="my-car-desc">
                  <p>Fuel: {car.fuel}</p>
                  <p>Color: {car.fuel}</p>
                  <p>Year: {car.year}</p>
                </article>

                <p className="my-car-price">${car.price}</p>

                <article className="my-car-btn">
                  <Link to={`/cars/${car._id}/edit`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button onClick={() => deleteHandler(car._id)}>
                    {" "}
                    <i className="fas fa-trash"></i>
                  </button>
                </article>
              </article>
            </article>
          ))}
        </section>
      )}
    </>
  );
};

export default MyCarsPage;
