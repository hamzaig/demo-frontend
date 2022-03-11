import axios from "axios";
import { USER_CREATE_PIN_FAIL, USER_CREATE_PIN_REQUEST, USER_CREATE_PIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_OTP_GENERATE_FAIL, USER_OTP_GENERATE_REQUEST, USER_OTP_GENERATE_SUCCESS, USER_PIN_RESET_FAIL, USER_PIN_RESET_REQUEST, USER_PIN_RESET_SUCCESS, USER_VERIFY_OTP_FAIL, USER_VERIFY_OTP_REQUEST, USER_VERIFY_OTP_SUCCESS } from "../constants/authConstants"

export function generateOtp(number) {
  return async (dispatch) => {
    try {

      dispatch({ type: USER_OTP_GENERATE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };

      const { data } = await axios.post("/api/users/genrateotp", { phone: number }, config);

      dispatch({ type: USER_OTP_GENERATE_SUCCESS, payload: data });

    } catch (error) {
      dispatch({ type: USER_OTP_GENERATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}

export function verifyOtp(phone, otp) {
  return async (dispatch) => {
    try {

      dispatch({ type: USER_VERIFY_OTP_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };

      const { data } = await axios.post("/api/users/verifyotp", { phone, otp }, config);

      dispatch({ type: USER_VERIFY_OTP_SUCCESS, payload: data });

    } catch (error) {
      dispatch({ type: USER_VERIFY_OTP_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}

export function createPin(phone, otp, pin) {
  return async (dispatch) => {
    try {

      dispatch({ type: USER_CREATE_PIN_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };
      const { data } = await axios.put("/api/users/createpin", { phone, otp, pin }, config);

      dispatch({ type: USER_CREATE_PIN_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
      dispatch({ type: USER_CREATE_PIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}

export function login(phone, pin) {
  return async (dispatch) => {
    try {

      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };
      console.log(phone, pin);
      const { data } = await axios.post("/api/users/login", { phone, pin }, config);

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}

export function resetPin(phone, otp = "", pin = "") {
  return async (dispatch) => {
    try {

      dispatch({ type: USER_PIN_RESET_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };

      const { data } = await axios.post("/api/users/resetpin", { phone, otp, pin }, config);

      // console.log(data);

      dispatch({ type: USER_PIN_RESET_SUCCESS, payload: data });


    } catch (error) {
      dispatch({ type: USER_PIN_RESET_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}