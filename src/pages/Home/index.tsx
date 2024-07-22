import { useEffect } from "react";
import { useLoaderData, useMatches, useRouteLoaderData } from "react-router";

const HomePage = () => {
  const RouteLoaderData = useRouteLoaderData("home");
  const LoaderData = useLoaderData();
  const Matches = useMatches();

  useEffect(() => {
    console.log(Matches);
    console.log(LoaderData);
    console.log(RouteLoaderData);
  }, []);
  return <div>Home Pages</div>;
};

export default HomePage;
