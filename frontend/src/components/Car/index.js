import "./styles.css";
import { Link } from "react-router-dom";

const Car = ({ car }) => {
  return (
    <>
      <article className="each-car">
        <div className="each-car-container">
          <Link to={`/car/${car._id}`}>
            <img className="each-car-image" src={car.image} alt={car.make} />
          </Link>
        </div>

        <p className='each-car-price'>${car.price}</p>

        <Link className="each-car-make-link" to={`/car/${car._id}`}>
          <h2 className="each-car-make">
            {car.make} {car.model}
          </h2>
        </Link>

        <p className="each-car-year-fuel">{car.year}, {car.fuel}</p>

        <p className="each-car-description">{car.description}</p>
      </article>
    </>
  );
};

export default Car;
