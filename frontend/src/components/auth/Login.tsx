"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import styles from "@/styles/auth/Login.module.css";
import hello from "../../public/images/auth/login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setFormData,
  setRegisterData,
  setIsLoggedIn,
} from "@/redux/slices/authSlice";
import { login, register } from "@/redux/services/authService";
import toast from "react-hot-toast";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { formData, registerData } = useSelector(
    (state: RootState) => state.auth
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormData({ [e.target.name]: e.target.value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRegisterData({ [e.target.name]: e.target.value }));
  };

  function validateEmail(email: string) {
    const parts = email.split("@");
    if (parts.length !== 2) {
      return false;
    }

    const localPart = parts[0];
    const domainPart = parts[1];

    if (!localPart || !domainPart) {
      return false;
    }

    if (localPart.length > 64 || domainPart.length > 255) {
      return false;
    }

    const domainParts = domainPart.split(".");
    if (domainParts.length < 2) {
      return false;
    }

    for (const part of domainParts) {
      if (part.length > 63) {
        return false;
      }
    }

    return true;
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }
    try {
      const result = await dispatch(login(formData));
      if (result.type === "login/rejected") {
        toast.error("No Account Found.");
      } else {
        toast.success("Login Successful!");
        dispatch(setIsLoggedIn(true));
        setTimeout(() => {
          router.replace("/home");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.payload);
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!validateEmail(registerData.email)) {
      toast.error("Invalid email format");
      return;
    }
    if (registerData.phone_number.length !== 10) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    try {
      const result = await dispatch(register(registerData));
      if (result.type === "register/rejected") {
        throw result;
      } else {
        toast.success("Registration Successful!");
        setTimeout(() => {
          router.replace("/home");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.payload);
      setLoading(false);
    }
  };

  const [isLogin, setIsLogin] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  const loginRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);

  const timeToShowLogin = 400;
  const timeToHideLogin = 200;
  const timeToShowSignUp = 100;
  const timeToHideSignUp = 400;
  const timeToHideAll = 500;

  const changeToLogin = () => {
    setFormVisible(true);
    setIsLogin(true);
    if (loginRef.current) {
      loginRef.current.style.display = "block";
      loginRef.current.style.opacity = "0";

      setTimeout(() => {
        if (loginRef.current) {
          loginRef.current.style.opacity = "1";
        }
      }, timeToShowLogin);

      setTimeout(() => {
        if (signUpRef.current) {
          signUpRef.current.style.display = "none";
        }
      }, timeToHideLogin);
    }
  };

  const changeToSignUp = () => {
    setFormVisible(true);
    setIsLogin(false);
    if (signUpRef.current) {
      signUpRef.current.style.display = "block";
      signUpRef.current.style.opacity = "0";

      setTimeout(() => {
        if (signUpRef.current) {
          signUpRef.current.style.opacity = "1";
        }
      }, timeToShowSignUp);

      setTimeout(() => {
        if (loginRef.current) {
          loginRef.current.style.display = "none";
        }
      }, timeToHideSignUp);
    }
  };

  const hideForms = () => {
    setFormVisible(false);
    if (loginRef.current) {
      loginRef.current.style.opacity = "0";
    }
    if (signUpRef.current) {
      signUpRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      if (loginRef.current) {
        loginRef.current.style.display = "none";
      }
      if (signUpRef.current) {
        signUpRef.current.style.display = "none";
      }
    }, timeToHideAll);
  };

  return (
    <div className={styles.main}>
      <div className={styles.cotn_principal}>
        <div className={styles.cont_centrar}>
          <div className={styles.cont_login}>
            <div className={styles.cont_info_log_sign_up}>
              <div className={styles.col_md_login}>
                <div className={styles.cont_ba_opcitiy}>
                  <h2>LOGIN</h2>
                  <p>
                    Welcome back! Please enter your credentials to access your
                    account.
                  </p>
                  <button className={styles.btn_login} onClick={changeToLogin}>
                    LOGIN
                  </button>
                </div>
              </div>
              <div className={styles.col_md_sign_up}>
                <div className={styles.cont_ba_opcitiy}>
                  <h2>SIGN UP</h2>
                  <p>
                    Join our community! Create an account to save recipes and
                    share your culinary creations.
                  </p>
                  <button
                    className={styles.btn_sign_up}
                    onClick={changeToSignUp}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.cont_back_info}>
              <div className={styles.cont_img_back_grey}>
                <img src={hello.src} alt="" />
              </div>
            </div>

            <div
              className={`${styles.cont_forms} ${
                formVisible
                  ? isLogin
                    ? styles.cont_forms_active_login
                    : styles.cont_forms_active_sign_up
                  : ""
              }`}
            >
              <div className={styles.cont_img_back_}>
                <img src={hello.src} alt="" />
              </div>

              <div ref={loginRef} className={`${styles.cont_form_login}`}>
                <a href="#" onClick={hideForms}>
                  <i className="material-icons">&#xE5C4;</i>
                </a>
                <h2>LOGIN</h2>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  aria-required="true"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  aria-required="true"
                />
                <button
                  className={styles.btn_login}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  LOGIN
                </button>
              </div>

              <div ref={signUpRef} className={`${styles.cont_form_sign_up}`}>
                <a href="#" onClick={hideForms}>
                  <i className="material-icons">&#xE5C4;</i>
                </a>
                <h2>SIGN UP</h2>
                <input
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  placeholder="Username"
                  required
                  aria-required="true"
                />
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Email"
                  required
                  aria-required="true"
                />
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Password"
                  required
                  aria-required="true"
                />
                <input
                  type="number"
                  name="phone_number"
                  value={registerData.phone_number}
                  onChange={handleRegisterChange}
                  placeholder="Phone number"
                  required
                  aria-required="true"
                />
                <button
                  className={styles.btn_sign_up}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
