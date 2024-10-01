"use client";
import Image from "next/image";
import styles from "../styles/NotFound.module.css";
import notfound from "@/public/images/404.png";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Page not found</h1>
        <div className={styles.imageWrapper}>
          <Image
            src={notfound.src}
            alt="Bread Basket"
            width={500}
            height={300}
          />
        </div>
        <button
          onClick={() => {
            router.push("/home");
          }}
        >
          Go to home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
