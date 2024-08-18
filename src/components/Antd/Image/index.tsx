import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, message, Modal, Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { uploadFile } from "../../../api/types/common";
// import { uploadFile } from "../../api/file";

interface JUploadImageProps {
  value?: string[] | string;
  onChange?: (value: string[] | string) => void;
  maxCount: number;
  accept?: string[];
  groupId: string | undefined;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const JUploadImage: React.FC<JUploadImageProps> = ({
  value = [],
  onChange,
  maxCount = 1,
  accept = [".png", ".PNG", ".jpg", ".JPG", ".jpeg", "JPEG"],
  groupId = "",
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const fileList = useMemo(() => {
    if (value === "") {
      return [];
    }
    return (Array.isArray(value) ? value : [value]).map((item: string) => ({
      name: item,
      uid: item,
      url: item,
    }));
  }, [value]);

  const [file, setFile] = useState<any>(null);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // useEffect(() => {
  //   onChange?.(fileList);
  // }, fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const setUploadFile = (file: File) => {
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("请选择图片");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("groupId", groupId);
    const result = await uploadFile(formData);
    if (result.code === "0") {
      setFile(null);
      if (maxCount === 1) {
        onChange?.(result.data.url);
      } else {
        onChange?.([result.data.url, ...fileList.map((item) => item.url)]);
      }
      message.success("上传成功");
    } else {
      message.error(result.msg || "上传失败");
    }
  };

  return (
    <>
      <Upload
        customRequest={handleUpload}
        beforeUpload={setUploadFile}
        accept={accept.join(",")}
        listType="picture-card"
        maxCount={maxCount}
        fileList={fileList}
        onPreview={handlePreview}
        multiple={maxCount > 0}
        onRemove={(file) => {
          const _fileList = fileList
            .filter((item) => item.url !== file.url)
            .map((item) => item.url);
          onChange?.(maxCount > 1 ? _fileList : _fileList.join(","));
        }}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image.PreviewGroup
          items={Array.isArray(value) ? value : [value]}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
        >
          <Image wrapperStyle={{ display: "none" }} src={previewImage} />
        </Image.PreviewGroup>
      )}
    </>
  );
};

export default JUploadImage;
