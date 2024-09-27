import React from "react";
import styles from "@/styles/footer/Footer.module.css";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <>
      <footer className={styles.footerArea}>
        <div className={styles.footerAreaWrap}>
          <div>
            <h4 className={styles.h4}>About Us</h4>
            <p className={styles.p}>
              We are passionate about sharing gluten-free recipes that everyone
              can enjoy. Our mission is to make cooking fun and accessible for
              everyone.
            </p>
          </div>
          <div>
            <h4 className={styles.h4}>Quick Links</h4>
            <ul className={styles.ul}>
              <li>
                <Link href="/home">Home</Link>
              </li>
              <li>
                <Link href="/home">Recipes</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/addrecipe">Post a Recipe</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.h4}>Contact Us</h4>
            <p className={styles.p}>Email: info@example.com</p>
            <p className={styles.p}>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className={styles.copyRight}>
          <p className={styles.p}>
            &copy; {new Date().getFullYear()} Gluten Free Recipes. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
