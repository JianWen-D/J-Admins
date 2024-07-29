import React from "react";
import * as Icons from "@ant-design/icons";

const JIcon = (props: { name: string }) => {
  const { name } = props;
  const antIcon: { [key: string]: any } = Icons;
  return React.createElement(antIcon[name]);
};

export default JIcon;
