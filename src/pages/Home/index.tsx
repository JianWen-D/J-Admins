import { useEffect } from "react";
import { useLoaderData, useMatches, useRouteLoaderData } from "react-router";
import JPage from "../../components/Antd/Page";
import JPageCtrl from "../../components/Antd/PageCtrl";

const HomePage = () => {
  const RouteLoaderData = useRouteLoaderData("home");
  const LoaderData: any = useLoaderData();
  const Matches = useMatches();

  useEffect(() => {
    console.log(Matches);
    console.log(LoaderData);
    console.log(RouteLoaderData);
  }, []);
  return (
    <JPage title={LoaderData.title} desc={LoaderData.desc}>
      <JPageCtrl
        onSubmit={() => {}}
        options={[
          {
            type: "input",
            key: "name",
            label: "名字",
            show: true,
          },
        ]}
      ></JPageCtrl>
    </JPage>
  );
};

export default HomePage;
