import { useDispatch } from "react-redux";
import { logout as Logout } from "../features/userSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch loagout action
    dispatch(Logout());
  };

  return { logout };
};
