"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/profile/UserProfile.module.css";
import { setActiveTab } from "@/redux/slices/recipeSlice";
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
import Loader from "../Loader";

const UserDetail = ({ icon, label }) => (
  <div className={styles.userDetailItem}>
    <FontAwesomeIcon className={styles.greencolor} icon={icon} />
    <p>{label}</p>
  </div>
);

const UserDetails = ({ user }) => (
  <div className={styles.userDetails}>
    <img
      src="https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_640.png"
      alt="User Profile"
      className={styles.userImage}
    />
    <UserDetail
      icon={faUser}
      label={`Name: ${user?.username || "Loading..."}`}
    />
    <UserDetail
      icon={faEnvelope}
      label={`Email: ${user?.email || "Loading..."}`}
    />
    <UserDetail
      icon={faPhone}
      label={`Phone no.: ${user?.phone_number || "Loading..."}`}
    />
  </div>
);

const TabButton = ({ isActive, onClick, label }) => (
  <Button
    variant="contained"
    sx={{
      backgroundColor: isActive ? "darkgreen" : "white",
      color: isActive ? "white" : "darkgreen",
      "&:hover": {
        backgroundColor: isActive ? "green" : "lightgray",
      },
    }}
    onClick={onClick}
    className={styles.tabButton}
  >
    {label}
  </Button>
);

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { createdRecipes, likedRecipes, activeTab, isLoading } = useSelector(
    (state: RootState) => state.recipe
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(currentUser());
    if (activeTab === "likedRecipes") {
      dispatch(fetchLikedRecipes());
    } else {
      dispatch(fetchCreatedRecipes());
    }
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  const recipesToDisplay =
    activeTab === "myRecipes" ? createdRecipes : likedRecipes;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.profileContainer}>
          <UserDetails user={user} />
          <div className={styles.recipeSection}>
            <div className={styles.tabSwitcher}>
              <TabButton
                isActive={activeTab === "myRecipes"}
                onClick={() => handleTabChange("myRecipes")}
                label="My Recipes"
              />
              <TabButton
                isActive={activeTab === "likedRecipes"}
                onClick={() => handleTabChange("likedRecipes")}
                label="Liked Recipes"
              />
            </div>
            <div className={styles.recipeCards}>
              {recipesToDisplay.length > 0 ? (
                recipesToDisplay.map((recipe) => (
                  <div className={styles.recipeCard} key={recipe.id}>
                    <Link href={`/${recipe.id}`}>
                      <RecipeCard recipe={recipe} />
                    </Link>
                  </div>
                ))
              ) : (
                <p className={styles.notfound}>
                  {activeTab === "myRecipes"
                    ? "You have not created any recipes yet."
                    : "You have not liked any recipes yet."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default redirectToLogin(Profile);
