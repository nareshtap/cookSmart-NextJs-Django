import React, { useState, useEffect } from "react";
import styles from "@/styles/header/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/services/authService";
import { setIsLoggedIn, setOverlayVisible } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchOverlay from "@/components/header/SearchOverlay";

const Navbar = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn, isOverlayVisible } = useSelector((state: RootState) => state.auth);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      dispatch(setIsLoggedIn(true));
    }
  }, []);

  const handleLogout = async (e) => {
    try {
      await dispatch(logout());
      toast.success("Logout Successful!");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      dispatch(setIsLoggedIn(false));
      router.push("/home");

      setTimeout(() => {
        router.replace("/home");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.payload || error?.message || "Logout failed";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/home" className={styles.Mainlogo}>
            CookSmart
          </Link>
        </div>
        <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/recipe/post">Post a Recipe</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <Link
                href="/home"
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Logout
              </Link>
            ) : (
              <Link href="/auth/login">Login</Link>
            )}
          </li>
          <li>
            <Link
              href="#"
              className={styles.searchLink}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setOverlayVisible(true));
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Link>
          </li>
        </ul>
      </nav>
      {isOverlayVisible && (
        <SearchOverlay onClose={() => dispatch(setOverlayVisible(false))} />
      )}
    </>
  );
};

export default Navbar;
