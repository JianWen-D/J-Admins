import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, message, Modal, Upload } from "antd";
import type { RcFile } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
// import { uploadFile } from "../../api/file";

interface JUploadImageProps {
  value?: string[];
  onChange?: (value: UploadFile[] | string) => void;
  maxCount: number;
  accept?: string[];
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
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const fileList = useMemo(() => {
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
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('groupId', 'a1aff2af5c6d2abd0251538e88483e30');
    // const result: any = await uploadFile(formData);
    // if (result.code === '0') {
    //   setFile(null);
    //   setFileList([
    //     {
    //       uid: result.data.id,
    //       name: result.data.fileName,
    //       url: result.data.url,
    //     },
    //     ...fileList,
    //   ]);
    //   onChange?.([result.data.url, ...fileList.map((item) => item.url)]);
    //   message.success('上传成功');
    // }
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
          const _fileList = fileList.filter((item) => item.url !== file.url);
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
      {/* <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal> */}
    </>
  );
};

export default JUploadImage;
