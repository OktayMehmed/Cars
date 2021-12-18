import { useEffect } from "react";
import Car from "../../components/Car";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import Search from "../../components/Search";
import { listCars } from "../../actions/Cars";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import "./styles.css";

const HomePage = () => {
  const {search} = useParams();

  const dispatch = useDispatch();

  const carsList = useSelector((state) => state.carsList);
  const { loading, cars, error } = carsList;

  useEffect(() => {
    dispatch(listCars(search));
  }, [dispatch, search]);

  return (
    <>
      <Search />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
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
