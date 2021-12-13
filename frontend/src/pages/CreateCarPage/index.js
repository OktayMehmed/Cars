import { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { carCreate, uploadCarImg } from "../../actions/Cars";

const CreateCarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createCar = useSelector((state) => state.createCar);
  const { loading, error, success } = createCar;

  const carImgUpload = useSelector((state) => state.carImgUpload);
  const { loading: imgLoading, img } = carImgUpload;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (success) {
      navigate("/");
      dispatch({ type: "CREATE_CAR_RESET" });
    }
  }, [navigate, userInfo, dispatch, success, img]);

  const uploadImageHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadCarImg(formData));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const {
      make,
      model,
      price,
      year,
      fuel,
      color,
      power,
      phone,
      description,
    } = Object.fromEntries(formData);
    console.log(img);
    dispatch(
      carCreate(
        make,
        model,
        img,
        price,
        year,
        fuel,
        color,
        power,
        phone,
        description
      )
    );
  };

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (
        <Loader />
      ) : (
        <section className="car-create-form-container">
          <h2 className="car-form-title">Create a car</h2>
          <form onSubmit={submitHandler} className="car-form">
            <div className="car-form-second-container">
              <div className="car-form-first">
                <article>
                  <select className="car-form-make" name="make" id="make">
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
                  />
                </article>
                <article className="car-form-image">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Image"
                    onChange={uploadImageHandler}
                  />
                  {imgLoading && <Loader />}
                </article>

                <article className="car-form-price">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                  />
                </article>
                <article className="car-form-year">
                  <input
                    type="number"
                    name="year"
                    id="year"
                    placeholder="Year"
                  />
                </article>
              </div>
              <div className="car-form-two">
                <select className="car-form-make" name="fuel" id="fuel">
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
                  />
                </article>
                <article className="car-form-power">
                  <input
                    type="number"
                    name="power"
                    id="power"
                    placeholder="Power"
                  />
                </article>
                <article className="car-form-phone">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone: 089*******"
                    pattern="[0-9]{10}"
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
              />
            </article>
            <button className="car-form-btn">Create a car</button>
          </form>
        </section>
      )}
    </>
  );
};

export default CreateCarPage;
