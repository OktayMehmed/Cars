import "./styles.css";

const Car = ({ car }) => {
  return (
    <>
      <article className="each-car">
        <div className="each-car-container">
          <a href={`/car/${car._id}`}>
            <img className="each-car-image" src={car.image} alt={car.make} />
          </a>
        </div>

        <p className='each-car-price'>${car.price}</p>

        <a className="each-car-make-link" href={`/car/${car._id}`}>
          <h2 className="each-car-make">
            {car.make} {car.model}
          </h2>
        </a>

        <p className="each-car-year-fuel">{car.year}, {car.fuel}</p>

        <p className="each-car-description">{car.description}</p>
      </article>
    </>
  );
};

export default Car;
