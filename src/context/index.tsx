import { ReactNode } from "react";
import { AuthProvider } from "./authContext";
import { CommonProvider } from "./commonContext";

interface AuthProps {
  page: string[];
  element: string[];
  api: string[];
}

export const AppProviders = ({
  children,
  auth,
  userInfo,
}: {
  children: ReactNode;
  auth?: AuthProps;
  userInfo: any;
}) => {
  return (
    <CommonProvider auth={auth}>
      <AuthProvider userInfo={userInfo}>{children}</AuthProvider>
    </CommonProvider>
  );
};
