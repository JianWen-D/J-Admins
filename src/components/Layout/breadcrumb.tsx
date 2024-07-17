import { Breadcrumb } from "antd";

const JHeaderBreadcrumb = () => {
  return (
    <div
      style={{
        // backgroundColor: "#fff",
        height: 32,
        padding: "0 12px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Breadcrumb
        separator=""
        items={[
          {
            href: "",
            title: "Application Center",
          },
          {
            type: "separator",
          },
          {
            href: "",
            title: "Application List",
          },
          {
            type: "separator",
          },
          {
            title: "An Application",
          },
        ]}
      />
    </div>
  );
};

export default JHeaderBreadcrumb;
