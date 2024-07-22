import { useEffect } from "react";
import { useRouteLoaderData } from "react-router";

const AboutPage = () => {
  const matches = useRouteLoaderData("about");

  useEffect(() => {
    console.log(matches);
  }, []);
  return <div>About Pages</div>;
};

export default AboutPage;
