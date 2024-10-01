"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/home/Slider.module.css";
import slider1 from "@/public/images/home/Slider1.jpg";
import slider2 from "@/public/images/home/Slider2.jpg";
import slider3 from "@/public/images/home/Slider3.jpg";

const slides = [
  {
    title: "Delicious Homemade Burger",
    description:
      "Sink your teeth into a juicy homemade burger made with fresh ground beef, seasoned to perfection. Topped with crisp lettuce, ripe tomatoes, and a tangy sauce, this burger is a crowd-pleaser that brings the taste of the grill right to your kitchen.",
    image: slider1.src,
  },
  {
    title: "Tasty Vegan Burger",
    description:
      "Savor the flavors of a hearty vegan burger made with black beans, quinoa, and spices. Topped with avocado and fresh veggies, this burger is not only nutritious but also bursting with flavor, proving that plant-based meals can be delicious!",
    image: slider2.src,
  },
  {
    title: "Classic Cheeseburger",
    description:
      "Enjoy the timeless classic: a cheeseburger with a perfectly grilled beef patty, melted cheese, and your choice of toppings. Served on a soft bun with pickles, onions, and ketchup, it’s the ultimate comfort food that never goes out of style.",
    image: slider3.src,
  },
];

interface SliderProps {
  scrollToRecipes: () => void;
}

const HomePageSlider: React.FC<SliderProps> = ({ scrollToRecipes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className={styles.heroArea}>
      <div className={styles.heroSlides}>
        <div
          className={styles.singleHeroSlide}
          style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        >
          <div
            className={styles.overlay}
            data-animation="fadeInUp"
            data-delay="100ms"
          >
            <h2 data-animation="fadeInUp" data-delay="300ms">
              {slides[currentIndex].title}
            </h2>
            <p data-animation="fadeInUp" data-delay="700ms">
              {slides[currentIndex].description}
            </p>
            <button
              onClick={scrollToRecipes}
              className={`${styles.btn} ${styles.deliciousBtn}`}
            >
              See recipes
            </button>
          </div>
        </div>

        <button className={styles.prevBtn} onClick={prevSlide}>
          ❮
        </button>
        <button className={styles.nextBtn} onClick={nextSlide}>
          ❯
        </button>
      </div>
    </section>
  );
};

export default HomePageSlider;
