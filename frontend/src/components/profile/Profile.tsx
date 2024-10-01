"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/profile/UserProfile.module.css";
import { selectRecipes, setActiveTab } from "@/redux/slices/recipeSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { currentUser } from "@/redux/services/authService";
import {
  fetchLikedRecipes,
  fetchCreatedRecipes,
} from "@/redux/services/recipeService";
import RecipeCard from "@/components/recipe/RecipeCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import redirectToLogin from "@/hoc/redirectToLogin";

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const { createdRecipes, likedRecipes, activeTab } = useSelector(
    (state: RootState) => state.recipe
  );

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCreatedRecipes());
    dispatch(fetchLikedRecipes());
    dispatch(currentUser());
  }, []);

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userDetails}>
        <img
          src="https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_640.png"
          alt="User Profile"
          className={styles.userImage}
        />
        <div className={styles.userDetailItem}>
          <FontAwesomeIcon className={styles.greencolor} icon={faUser} />
          <p>Name: {user?.username || "Loading..."}</p>
        </div>
        <div className={styles.userDetailItem}>
          <FontAwesomeIcon className={styles.greencolor} icon={faEnvelope} />
          <p>Email: {user?.email || "Loading..."}</p>
        </div>
        <div className={styles.userDetailItem}>
          <FontAwesomeIcon className={styles.greencolor} icon={faPhone} />
          <p>Phone no.: {user?.phone_number || "Loading..."}</p>
        </div>
      </div>
      <div className={styles.recipeSection}>
        <div className={styles.tabSwitcher}>
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                activeTab === "myRecipes" ? "darkgreen" : "white",
              color: activeTab === "myRecipes" ? "white" : "darkgreen",
              "&:hover": {
                backgroundColor:
                  activeTab === "myRecipes" ? "green" : "lightgray",
              },
            }}
            onClick={() => handleTabChange("myRecipes")}
            className={styles.tabButton}
          >
            My Recipes
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                activeTab === "likedRecipes" ? "darkgreen" : "white",
              color: activeTab === "likedRecipes" ? "white" : "darkgreen",
              "&:hover": {
                backgroundColor:
                  activeTab === "likedRecipes" ? "green" : "lightgray",
              },
            }}
            onClick={() => handleTabChange("likedRecipes")}
            className={styles.tabButton}
          >
            Liked Recipes
          </Button>
        </div>
        <div className={styles.recipeCards}>
          {(activeTab === "myRecipes" && createdRecipes.length > 0) ||
          (activeTab === "likedRecipes" && likedRecipes.length > 0) ? (
            <>
              {(activeTab === "myRecipes" ? createdRecipes : likedRecipes).map(
                (recipe) => (
                  <div className={styles.recipeCard} key={recipe.id}>
                    <Link href={`/${recipe.id}`}>
                      <RecipeCard recipe={recipe} />
                    </Link>
                  </div>
                )
              )}
            </>
          ) : activeTab === "myRecipes" ? (
            <p className={styles.notfound}>
              You have not created any recipes yet.
            </p>
          ) : (
            <p className={styles.notfound}>
              You have not liked any recipes yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default redirectToLogin(Profile);
