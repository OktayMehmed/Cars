import { useState, useEffect } from "react";
import Car from "../../components/Car";
import "./styles.css";

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <>
      <section className="home-cars">
        {cars.map((car) => (
          <Car key={car._id} car={car} />
        ))}
      </section>
    </>
  );
};

export default HomePage;
