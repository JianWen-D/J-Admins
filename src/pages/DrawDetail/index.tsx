import {
  LayoutOutlined,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Tabs, TabsProps, Typography } from "antd";
import "./index.less";
import { JFormItemProps } from "../../components/Antd/Form/types";
import JForm from "../../components/Antd/Form";
import { useEffect, useRef, useState } from "react";
const { Title } = Typography;
import Draggable from "react-draggable";
import SettingForm from "./SettingForm";

// https://janvem.oss-cn-hangzhou.aliyuncs.com/chinaculture/card_bg_1.jpg

const DrawDetailPage = () => {
  const drawCanvasRef = useRef(null);
  const drawCanvasContentRef = useRef(null);
  const [bgImg, setBgImg] = useState("");
  const [bgWidth, setBgWidth] = useState(0);
  const [bgHeight, setBgHeight] = useState(0);
  const [scale, setScale] = useState<number>(1);
  const baseFormOptions: JFormItemProps[] = [
    {
      type: "slot",
      key: "bgImg",
      label: "底图",
      edit: true,
      slot: () => {
        return (
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="请输入底图连接"
              onChange={(e) => {
                baseFormRef.setFieldValue("bgImg", e.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                setBgImg(baseFormRef.getFieldValue("bgImg"));
                onLoadImg(baseFormRef.getFieldValue("bgImg"));
              }}
            >
              确定
            </Button>
          </Space.Compact>
        );
      },
    },
    {
      type: "input",
      key: "name",
      label: "模版名称",
      edit: true,
    },
    {
      type: "textarea",
      key: "desc",
      label: "备注",
      edit: true,
    },
  ];
  const [baseFormRef, baseFormDom] = JForm({
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    options: baseFormOptions,
  });
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "基础信息",
      icon: <SettingOutlined />,
      children: baseFormDom,
    },
    {
      key: "2",
      label: "布局设置",
      icon: <LayoutOutlined />,
      children: <SettingForm />,
    },
  ];

  const onLoadImg = (value: string) => {
    const img = new Image();
    img.src = value;
    img.onload = () => {
      getScaleNum(img.width, img.height);
    };
  };
  const getScaleNum = (width: number, height: number) => {
    const contentWidth = drawCanvasContentRef?.current.clientWidth;
    const contentHeight = drawCanvasContentRef?.current.clientHeight;
    let scaleWidth = width / contentWidth;
    let scaleHeight = height / contentHeight;
    if (width > contentWidth) {
      scaleWidth = contentWidth / width;
    }
    if (height > contentHeight) {
      scaleHeight = contentHeight / height;
    }
    console.log(width, contentWidth, scaleWidth);
    console.log(height, contentHeight, scaleHeight);
    const scalNum = scaleHeight > scaleWidth ? scaleWidth : scaleHeight;
    setScale(scalNum);
    setBgWidth(width * scalNum);
    setBgHeight(height * scalNum);
  };

  useEffect(() => {
    setBgImg(
      "https://janvem.oss-cn-hangzhou.aliyuncs.com/chinaculture/card_bg_1.jpg"
    );
    onLoadImg(
      "https://janvem.oss-cn-hangzhou.aliyuncs.com/chinaculture/card_bg_1.jpg"
    );
  }, []);
  return (
    <div className="draw-detail-page">
      <div className="draw-detail-content" ref={drawCanvasContentRef}>
        <div
          className="draw-canvas"
          ref={drawCanvasRef}
          style={{
            position: "relative",
            background: `url(${bgImg}) center center / 100% no-repeat `,
            width: bgWidth,
            height: bgHeight,
          }}
        >
          {bgImg && (
            <Draggable
              bounds="parent"
              onDrag={(_e, ui) => {
                console.log(ui);
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#aaa",
                }}
              ></div>
            </Draggable>
          )}
        </div>
      </div>
      <div className="draw-detail-aside">
        <div className="draw-detail-form">
          <Title level={4}>设置</Title>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
        <div className="draw-detail-ctrl">
          <Space align="center" style={{ height: 64 }}>
            <Button style={{ width: 120 }}>返回</Button>
            <Button
              style={{ width: 120, marginLeft: 8 }}
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => {
                // scaleHeight();
              }}
            >
              保存
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default DrawDetailPage;
