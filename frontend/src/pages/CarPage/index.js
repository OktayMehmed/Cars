import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCarsDetails } from "../../actions/Cars";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import "./styles.css";

const CarPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const carsDetails = useSelector((state) => state.carsDetails);
  const { loading, car, error } = carsDetails;

  useEffect(() => {
    dispatch(listCarsDetails(id));
  }, [id, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <section className="car">
          <article className="car-info">
            <h1 className="car-info-make-model">
              {car.make} {car.model}
            </h1>

            <p className="car-info-price">
              <strong>Price:</strong> ${car.price}
            </p>

            <p className="car-info-year">
              <strong>Year: </strong>
              {car.year}
            </p>
            <p className="car-info-fuel">
              <strong>Fuel: </strong>
              {car.fuel}
            </p>
            <p className="car-info-color">
              <strong>Color:</strong> {car.color}
            </p>
            <p className="car-info-power">
              <strong>Power:</strong> {car.power} hp
            </p>
            <p className="car-info-desc">{car.description}</p>

            <button className="car-info-number">
              <i className="fas fa-phone"></i> 0{car.phone}
            </button>
          </article>

          <img className="car-image" src={car.image} alt={car.make} />
        </section>
      )}
    </>
  );
};

export default CarPage;
