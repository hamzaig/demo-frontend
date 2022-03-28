import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createPinReducer, userLoginReducer, userLogoutReducer, userOtpGenerateReducer, userPinChangeReducer, userPinResetReducer, verifyOtpReducer } from "./reducers/authReducer";
import ThemeReducer from "./reducers/ThemeReducer";
import { deleteBusinessReducer, getBusinessesReducer } from "./reducers/businessReducer";

const userDataFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};

const reducer = combineReducers({
  theme: ThemeReducer,
  otp: userOtpGenerateReducer,
  verifyOtp: verifyOtpReducer,
  createPin: createPinReducer,
  userLogin: userLoginReducer,
  userLogout: userLogoutReducer,
  pinReset: userPinResetReducer,
  pinChange: userPinChangeReducer,
  businesses: getBusinessesReducer,
  deleteBusiness: deleteBusinessReducer,
});

const middleware = [thunk];

const initialState = {
  userLogin: { userData: userDataFromLocalStorage },
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
