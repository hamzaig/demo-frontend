import { rightLogShift } from 'mathjs';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import logo from "../assests/images/logo.png"
import Loader from '../components/Loader';
import { createPin, generateOtp, login, resetPin, verifyOtp } from '../store/actions/authActions';
import "./authentication.scss";

const AuthenticationPage = () => {
  const dispatch = useDispatch();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [confirmPinCode, setConfirmPinCode] = useState("");
  const [timer, setTimer] = useState("00:00");
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [isPinValid, setIsPinValid] = useState(true);
  const [isConfirmPinValid, setIsConfirmPinValid] = useState(true);
  const [inverseLoginAndReset, setInverseLoginAndReset] = useState(false);




  const otpData = useSelector(state => state.otp);
  const { loading: loadingOtp, error: errorOtp, success: successOtp } = otpData;

  const verifyOtpState = useSelector(state => state.verifyOtp);
  const { loading: loadingVerifyOtp, error: errorVerifyOtp, success: successVerifyOtp, user } = verifyOtpState;

  const createPinState = useSelector(state => state.createPin);
  const { loading: loadingCreatePin, error: errorCreatePin, success: successCreatePin, userData } = createPinState;

  const userLogin = useSelector(state => state.userLogin);
  const { loading: loadingUserLogin, error: errorUserLogin, success: successUserLogin, userData: userLoginData } = userLogin;

  const pinReset = useSelector(state => state.pinReset);
  const { loading: loadingPinReset, error: errorPinReset, success: successPinReset, responseInfo: pinResetInfo } = pinReset;


  useEffect(() => {
    if (pinResetInfo === "pin is changed") {
      setForgotPassword(false);
      setPinCode("");
      setOtp("");
      setPhone("");
    }
  }, [pinResetInfo])

  const startTimer = (cb) => {
    let counter = 1;
    const myIntervel = setInterval(() => {
      setTimer(`00:` + `${counter++}`.padStart(2, "0"));
    }, 1000);
    setTimeout(() => {
      clearInterval(myIntervel);
      setTimer(<span onClick={cb} style={{ cursor: "pointer", fontWeight: "700" }}>Resend Code by SMS</span>)
    }, 31000);
  }



  const submitHandler = (e) => {
    e.preventDefault();
    if (!successOtp && errorOtp !== "user Already registered") {
      dispatch(generateOtp(phone));
      startTimer(submitHandler);
    } else if (!successVerifyOtp && successOtp) {
      dispatch(verifyOtp(phone, otp))
    } else if (!successCreatePin && successVerifyOtp) {
      if (pinCode !== confirmPinCode) {
        setIsConfirmPinValid(false);
        return;
      }
      dispatch(createPin(user.phone, user.otp, pinCode));
    } else if (errorOtp === "user Already registered") {
      console.log(phone, pinCode);
      dispatch(login(phone, pinCode));
    }
  }




  const phoneHandler = (e) => {
    const rgx = /^[0][3][\d]{2}[\d]{7}$/

    if (e.target.value.match(rgx)) {
      setIsPhoneValid(true)
    } else {
      setIsPhoneValid(false)
    }
    setPhone(e.target.value)
  }
  const otpHandler = (e) => {
    if (e.target.value.length === 4) {
      setIsOtpValid(true)
    } else {
      setIsOtpValid(false)
    }
    setOtp(e.target.value)
  }
  const pinHandler = (e) => {
    if (e.target.value.length === 4) {
      setIsPinValid(true)
    } else {
      setIsPinValid(false)
      setIsConfirmPinValid(false)
    }
    if (errorOtp === "user Already registered") {
      setIsConfirmPinValid(true)
    }
    setPinCode(e.target.value)
  }
  const confirmPinHandler = (e) => {
    if (e.target.value.length === 4) {
      setIsConfirmPinValid(true)
    } else {
      setIsConfirmPinValid(false)
    }
    setConfirmPinCode(e.target.value)
  }

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    if (!successPinReset) {
      dispatch(resetPin(phone));
      startTimer(resetPasswordHandler);
    } else if (successPinReset && pinResetInfo === "otp generated") {
      dispatch(resetPin(phone, otp));
    } else if (successPinReset && pinResetInfo === "otp matched") {
      if (pinCode !== confirmPinCode) {
        setIsConfirmPinValid(false);
        return;
      }
      dispatch(resetPin(phone, otp, pinCode));
    }
  }

  const changeToForgot = () => {
    setInverseLoginAndReset(true);
    setForgotPassword(true)
    setTimeout(() => {
      setInverseLoginAndReset(false);
    }, 100);
  }

  const changeToLogin = () => {
    setInverseLoginAndReset(true);
    setForgotPassword(false)
    setTimeout(() => {
      setInverseLoginAndReset(false);
    }, 100);
  }



  return (
    <>
      {(loadingOtp || loadingVerifyOtp || loadingCreatePin || loadingUserLogin || loadingPinReset || inverseLoginAndReset) && <Loader />}
      <div className="main-container">
        <div className="left-div">
          <div className="logo-container" >
            <img src={logo} alt="" />
          </div>
          <div className="detail-container">
            <h1>Welcome to Mobi Khata</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, laudantium illum ab ratione, distinctio adipisci porro tempore, accusantium ad est Doloribus nisi maiores similique dignissimos ipsum aliquid in reiciendis.</p>
          </div>
        </div >
        <div className="right-container">
          {!forgotPassword ? (<>
            <h1 className='h1-heading'>CREATE ACCOUNT / LOGIN</h1>
            <div className='form-container'>
              <form onSubmit={submitHandler}>
                {errorOtp && errorOtp !== "user Already registered" ? <p style={{ color: "red" }}>{errorOtp}</p> : ""}
                {errorVerifyOtp && <p style={{ color: "red" }}>{errorVerifyOtp}</p>}
                {errorCreatePin && <p style={{ color: "red" }}>{errorCreatePin}</p>}
                {errorUserLogin && <p style={{ color: "red" }}>{errorUserLogin}</p>}
                {!successOtp ? (errorOtp === "user Already registered" ? (<h1>PLEASE ENTER YOUR PIN</h1>) : <h1>ENTER MOBILE NUMBER</h1>) : (successVerifyOtp ? (<h1>PLEASE MAKE YOUR PIN</h1>) : (<h1>PLEASE ENTER OTP</h1>))}
                <div>
                  <div className='input-div'>
                    <span>+92</span>
                    <input type="text" className='number-input' placeholder='example 03138448231' value={phone} onChange={phoneHandler} disabled={successOtp} style={{
                      border: isPhoneValid ? "" : "1px solid red"
                    }} maxLength="11" autoFocus />
                  </div>
                  {successOtp && (<>
                    <div className='input-div pin-input'>
                      <span>OTP</span>
                      <input type="text" className='number-input' name='otp' placeholder='Please Enter OTP' value={otp} disabled={successVerifyOtp} onChange={otpHandler} style={{
                        border: isOtpValid ? "" : "1px solid red"
                      }} maxLength="4" autoFocus />
                    </div>
                    {!successVerifyOtp && <p style={{ marginTop: "12px", textAlign: "center" }}>{timer}</p>}
                  </>
                  )}
                  {errorOtp === "user Already registered" && (<div className='input-div pin-input'>
                    <span>PIN</span>
                    <input type="password" className='number-input' name='otp' placeholder='Please Enter Your Pin' value={pinCode} onChange={pinHandler} disabled={successVerifyOtp} style={{
                      border: isPinValid ? "" : "1px solid red"
                    }} maxLength="4" autoFocus />
                  </div>)}
                  {successVerifyOtp && (<><div className='input-div pin-input'>
                    <span>PIN</span>
                    <input type="password" className='number-input' name='pin' placeholder='Make Your Pin Code' value={pinCode} onChange={pinHandler} style={{
                      border: isPinValid ? "" : "1px solid red"
                    }} maxLength="4" autoFocus />
                  </div>
                    <div className='input-div pin-input'>
                      <span>PIN</span>
                      <input type="password" className='number-input' name='pin' placeholder='Confirm Your Pin Code' value={confirmPinCode} onChange={confirmPinHandler} style={{
                        border: isConfirmPinValid ? "" : "1px solid red"
                      }} maxLength="4" />
                    </div>

                  </>)}
                </div>
                <div>
                  <button type="submit" disabled={phone === "" || (!isPhoneValid || !isOtpValid || !isPinValid || !isConfirmPinValid)}
                    style={{
                      backgroundColor: (phone === "" || (!isPhoneValid || !isOtpValid || !isPinValid || !isConfirmPinValid)) ? "#999" : ""
                    }}
                  >Continue</button>
                </div>
                <div>
                  <p>Forgot PIN? <span style={{
                    fontWeight: "700",
                    cursor: "pointer"
                  }} onClick={changeToForgot}>Click here</span></p>
                </div>
              </form>
            </div>
          </>) : (
            // ///////////////////////////////////////////////Forgot Pin
            <>
              <h1 className='h1-heading'>RESET PIN</h1>
              <div className='form-container'>
                <form onSubmit={resetPasswordHandler}>
                  {errorPinReset && <p style={{ color: "red" }}>{errorPinReset}</p>}
                  {!successPinReset ? (<h1>ENTER MOBILE NUMBER</h1>) : (<h1>PLEASE ENTER OTP</h1>)}
                  <div>
                    <div className='input-div'>
                      <span>+92</span>
                      <input type="text" className='number-input' placeholder='example 03138448231' value={phone} onChange={phoneHandler} disabled={successPinReset} style={{
                        border: isPhoneValid ? "" : "1px solid red"
                      }} maxLength="11" autoFocus />
                    </div>
                    {(successPinReset || pinResetInfo === "otp generated") && (<>
                      <div className='input-div pin-input'>
                        <span>OTP</span>
                        <input type="text" className='number-input' name='otp' placeholder='Please Enter OTP' value={otp} disabled={pinResetInfo === "otp matched"} onChange={otpHandler} style={{
                          border: isOtpValid ? "" : "1px solid red"
                        }} maxLength="4" autoFocus />
                      </div>
                      {!(pinResetInfo === "otp matched") && <p style={{ marginTop: "12px", textAlign: "center" }}>{timer}</p>}
                    </>
                    )}
                    {pinResetInfo === "otp matched" && (<><div className='input-div pin-input'>
                      <span>PIN</span>
                      <input type="password" className='number-input' name='pin' placeholder='Make Your Pin Code' value={pinCode} onChange={pinHandler} style={{
                        border: isPinValid ? "" : "1px solid red"
                      }} maxLength="4" autoFocus />
                    </div>
                      <div className='input-div pin-input'>
                        <span>PIN</span>
                        <input type="password" className='number-input' name='pin' placeholder='Confirm Your Pin Code' value={confirmPinCode} onChange={confirmPinHandler} style={{
                          border: isConfirmPinValid ? "" : "1px solid red"
                        }} maxLength="4" />
                      </div>
                    </>)}
                  </div>
                  <div>
                    <button type="submit" disabled={phone === "" || (!isPhoneValid || !isOtpValid || !isPinValid)}
                      style={{
                        backgroundColor: (phone === "" || (!isPhoneValid || !isOtpValid || !isPinValid)) ? "#999" : ""
                      }}
                    >Continue</button>
                  </div>
                  <div>
                    <p>Login/Register? <span style={{
                      fontWeight: "700",
                      cursor: "pointer"
                    }} onClick={changeToLogin}>Click here</span></p>
                  </div>
                </form>
              </div>
            </>)}
        </div>
      </div>
    </>
  )
}



export default AuthenticationPage;