import { Breadcrumb } from "antd";
import { useMatches } from "react-router";

const JHeaderBreadcrumb = () => {
  const Matches = useMatches();
  return (
    <div
      style={{
        lineHeight: 32,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Breadcrumb
        items={Matches.map((item: any) => ({
          href: item.pathname,
          title: item.data.title,
        }))}
      />
    </div>
  );
};

export default JHeaderBreadcrumb;
