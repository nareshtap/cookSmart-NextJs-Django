import React from "react";
import styles from "@/styles/recipe/Poster.module.css";
import recipeTitle from "@/public/images/recipes/recipeTitle.jpg";

const Poster = () => {
  return (
    <>
      <div
        className={styles.breadcumbArea}
        style={{
          backgroundImage: `url(${recipeTitle.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.container}>
          <div className={styles.breadcumbText}>
            <h2 className={styles.titleOverlay}>Recipe Details</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Poster;
