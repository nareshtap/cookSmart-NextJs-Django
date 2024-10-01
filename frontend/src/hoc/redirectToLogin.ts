import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

const redirectLoggedIn = (WrappedComponent: React.ComponentType) => {
  const RedirectLoggedIn: React.FC = (props) => {
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/auth/login");
      }
    }, [router]);

    const modifiedComponent = React.createElement(WrappedComponent, props);

    return modifiedComponent;
  };

  return RedirectLoggedIn;
};

export default redirectLoggedIn;
