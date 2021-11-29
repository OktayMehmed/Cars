import { useEffect } from "react";
import Car from "../../components/Car";
import Loader from "../../components/Loader";
import { listCars } from "../../actions/Cars";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const carsList = useSelector((state) => state.carsList);
  const { loading, cars, error } = carsList;

  useEffect(() => {
    dispatch(listCars());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <section className="home-cars">
          {cars.map((car) => (
            <Car key={car._id} car={car} />
          ))}
        </section>
      )}
    </>
  );
};

export default HomePage;
