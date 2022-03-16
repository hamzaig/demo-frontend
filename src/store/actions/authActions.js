import axios from "axios";
import { USER_CREATE_PIN_FAIL, USER_CREATE_PIN_REQUEST, USER_CREATE_PIN_RESET, USER_CREATE_PIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_RESET, USER_LOGIN_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_OTP_GENERATE_FAIL, USER_OTP_GENERATE_REQUEST, USER_OTP_GENERATE_RESET, USER_OTP_GENERATE_SUCCESS, USER_PIN_CHANGE_FAIL, USER_PIN_CHANGE_REQUEST, USER_PIN_CHANGE_SUCCESS, USER_PIN_RESET_FAIL, USER_PIN_RESET_REQUEST, USER_PIN_RESET_SUCCESS, USER_VERIFY_OTP_FAIL, USER_VERIFY_OTP_REQUEST, USER_VERIFY_OTP_RESET, USER_VERIFY_OTP_SUCCESS } from "../constants/authConstants"

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

export function changePin(pin, newPin) {
  return async (dispatch, getState) => {
    try {

      dispatch({ type: USER_PIN_CHANGE_REQUEST });

      const { userLogin: { userData } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        }
      };

      console.log(userData.token);

      await axios.post("/api/users/changePin", { pin, newPin }, config);

      // console.log(data);

      dispatch({ type: USER_PIN_CHANGE_SUCCESS });

    } catch (error) {
      dispatch({ type: USER_PIN_CHANGE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
  }
}



export function logoutUser() {
  return async (dispatch) => {

    dispatch({ type: USER_LOGOUT_REQUEST });

    localStorage.removeItem("userInfo")

    dispatch({ type: USER_LOGIN_RESET })
    dispatch({ type: USER_OTP_GENERATE_RESET })
    dispatch({ type: USER_VERIFY_OTP_RESET })
    dispatch({ type: USER_CREATE_PIN_RESET })

    dispatch({ type: USER_LOGOUT_SUCCESS });
  }
}