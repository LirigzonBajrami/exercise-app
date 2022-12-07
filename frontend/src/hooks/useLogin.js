import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as Login } from "../features/userSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (res.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(data));

      // update user state
      dispatch(Login(data));
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
