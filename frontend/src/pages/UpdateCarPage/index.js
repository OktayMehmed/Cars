import { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { carUpdate, listCarsDetails } from "../../actions/Cars";

const UpdateCarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [year, setYear] = useState(0);
  const [fuel, setFuel] = useState("");
  const [color, setColor] = useState("");
  const [power, setPower] = useState(0);
  const [phone, setPhone] = useState(0);
  const [description, setDescription] = useState("");
  const [imgLoader, setImgLoader] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const carsDetails = useSelector((state) => state.carsDetails);
  const { car } = carsDetails;

  const updateCar = useSelector((state) => state.updateCar);
  const { loading, error, success } = updateCar;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (success) {
      dispatch({ type: "CARS_UPDATE_RESET" });
      navigate("/my-cars");
    } else {
      if (!car.make || car._id !== id) {
        dispatch(listCarsDetails(id));
      } else {
        setMake(car.make);
        setModel(car.model);
        setImage(car.image);
        setPrice(car.price);
        setYear(car.year);
        setFuel(car.fuel);
        setColor(car.color);
        setPower(car.power);
        setPhone(car.phone);
        setDescription(car.description);
      }
    }
  }, [navigate, userInfo, dispatch, car, id, success]);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setImgLoader(true)

    try {
      let res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImage(data)
      setImgLoader(false)
    } catch (error) {
      console.error(error);
      setImgLoader(false)
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      carUpdate({
        _id: id,
        make,
        model,
        image,
        price,
        year,
        fuel,
        color,
        power,
        phone,
        description,
      })
    );
  };

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (
        <Loader />
      ) : (
        <section className="car-form-container">
          <h2 className="car-form-title">Edit car</h2>
          <form onSubmit={submitHandler} className="car-form">
            <div className="car-form-second-container">
              <div className="car-form-first">
                <article>
                  <select
                    className="car-form-make"
                    name="make"
                    id="make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                  >
                    <option>Make</option>
                    <option>Alfa Romeo</option>
                    <option>Aston Martin</option>
                    <option>Audi</option>
                    <option>BMW</option>
                    <option>Bentley</option>
                    <option>Bugatti</option>
                    <option>Cadillac</option>
                    <option>Chevrolet</option>
                    <option>Citroen</option>
                    <option>Dodge</option>
                    <option>Ferrari</option>
                    <option>Ford</option>
                    <option>Jaguar</option>
                    <option>Jeep</option>
                    <option>Lamborghini</option>
                    <option>Land Rover</option>
                    <option>Mercedes-Benz</option>
                    <option>Mitsubishi</option>
                    <option>Opel</option>
                    <option>Porsche</option>
                    <option>Rolls-Royce</option>
                    <option>Suzuki</option>
                    <option>Toyota</option>
                  </select>
                </article>
                <article className="car-form-model">
                  <input
                    type="text"
                    name="model"
                    id="model"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </article>
                <article className="car-form-image">
                  <input
                    type="text"
                    id="image"
                    placeholder="Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </article>
                <article className="car-form-image">
                  <input
                    type="file"
                    id="image-file"
                    placeholder="Image"
                    onChange={uploadImageHandler}
                  />
                  {imgLoader && <Loader />}
                </article>
                <article className="car-form-price">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </article>
                <article className="car-form-year">
                  <input
                    type="number"
                    name="year"
                    id="year"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </article>
              </div>
              <div className="car-form-two">
                <select
                  className="car-form-make"
                  name="fuel"
                  id="fuel"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                >
                  <option>Fuel</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
                <article className="car-form-color">
                  <input
                    type="text"
                    name="color"
                    id="color"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </article>
                <article className="car-form-power">
                  <input
                    type="number"
                    name="power"
                    id="power"
                    placeholder="Power"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                  />
                </article>
                <article className="car-form-phone">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone: 089*******"
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </article>
              </div>
            </div>

            <article className="car-form-description">
              <textarea
                type="number"
                name="description"
                id="description"
                placeholder="Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </article>
            <button className="car-form-btn">Update</button>
          </form>
        </section>
      )}
    </>
  );
};

export default UpdateCarPage;
