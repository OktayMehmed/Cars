import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./reducers/User";
import {
  carsListReducer,
  carsDetailsReducer,
  myCarsReducer,
  createCarReducer,
  deleteCarReducer,
  updateCarReducer,
  carImgUploadReducer,
} from "./reducers/Cars";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  carsList: carsListReducer,
  carsDetails: carsDetailsReducer,
  myCars: myCarsReducer,
  createCar: createCarReducer,
  deleteCar: deleteCarReducer,
  updateCar: updateCarReducer,
  carImgUpload: carImgUploadReducer,
});

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
