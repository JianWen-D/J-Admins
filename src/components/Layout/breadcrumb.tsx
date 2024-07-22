import { Breadcrumb } from "antd";
import { useMatches } from "react-router";

const JHeaderBreadcrumb = () => {
  const Matches = useMatches();
  return (
    <div
      style={{
        lineHeight: 32,
        padding: "8px 12px",
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
