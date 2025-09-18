import RootLayout from "@/components/Layout";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store";
import { Navigate, useLocation } from "react-router-dom";

const PrivateOutlet = () => {
  const location = useLocation();

  const { token } = useAppSelector((state) => state.member);

  return token ? (
    <RootLayout />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  );
};

export default PrivateOutlet;
