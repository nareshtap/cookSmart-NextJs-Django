"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/styles/recipe/Poster.module.css";

interface PopularRecipeProps {
  currentRecipes: any;
}

const Slides: React.FC<PopularRecipeProps> = ({ currentRecipes }) => {
  return (
      <div
        className={styles.TitlePoster}
        style={{
          backgroundImage: `url(${currentRecipes?.photo_link})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      </div>
  );
};

export default Slides;
