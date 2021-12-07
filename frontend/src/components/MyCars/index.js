import "./styles.css";
import { Link } from "react-router-dom";

const MyCars = ({ car }) => {
  return (
    <>
      <article className="my-car">
        <img className="my-car-img" src={car.image} alt={car.make} />

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
            <button>
              {" "}
              <i className="fas fa-trash"></i>
            </button>
          </article>
        </article>
      </article>
    </>
  );
};

export default MyCars;
