import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

const CarPage = ({ setCarId }) => {
  const [car, setCar] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setCarId(id);

    fetch(`http://localhost:8000/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, [id, setCarId]);

  return (
    <>
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
    </>
  );
};

export default CarPage;
