import React from "react";
import styles from "@/styles/recipe/YoutubeCard.module.css";
import { YouTubeVideo } from "@/types/recipe";

interface PopularRecipeProps {
  videos: YouTubeVideo[];
}

const YoutubeCard: React.FC<PopularRecipeProps> = ({ videos }) => {
  const handleRedirect = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <section className={styles.bestRecipeArea}>
      <div className={styles.col12}>
        <div className={styles.sectionHeading}>
          <h2>Suggested YouTube Videos</h2>
        </div>
      </div>
      {videos?.length > 0 ? (
        <div className={styles.allRecipeMain}>
          {videos?.map((video) => (
            <div
              key={video.videoId}
              onClick={() => handleRedirect(video.url)}
              className={styles.singleBestRecipeArea}
            >
              <img src={video.thumbnail} alt={video.title} />
              <div className={styles.recipeContent}>
                <h6>From: {video.channelName}</h6>
                <h5>{video.title}</h5>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.sectionNoHeading}>
          <h2>No videos Found.</h2>
        </div>
      )}
    </section>
  );
};

export default YoutubeCard;
