import React from "react";
import styles from "@/styles/home/RecipePoster.module.css";
import poster from "@/public/images/home/background.jpg";

interface RecipePosterProps {
  scrollToRecipes: () => void;
}

const ThirdPart: React.FC<RecipePosterProps> = ({ scrollToRecipes }) => {
  return (
    <section
      className={styles.ctaArea}
      style={{
        backgroundImage: `url(${poster.src})`,
      }}
    >
      <div className={styles.ctaContent}>
        <h2>Special Recipe</h2>
        <p>
          Enjoy a delicious Spicy Garlic Shrimp Pasta! Sauté shrimp in olive oil
          with minced garlic, then add cherry tomatoes and red pepper flakes.
          Toss with al dente spaghetti and a splash of white wine. Finish with
          parsley and Parmesan for a flavorful, quick meal that’s sure to
          impress!
        </p>
        <button
          onClick={scrollToRecipes}
          className={`${styles.btn} ${styles.deliciousBtn}`}
        >
          Discover all recipes
        </button>
      </div>
    </section>
  );
};

export default ThirdPart;
