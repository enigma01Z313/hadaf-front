import requests from "../request";

const uploadImage = async (file) => {
  const data = await requests.post()

  // try {
  //   const response = await fetch(uploadAddr, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await response.json();
  //   changeCurrentSurvayQuestion("media", {
  //     value: `https://p.staticcloud.click/${data.fileName}`,
  //     status: true,
  //     realName: fileName
  //   });
  //   setImgInfo(fileName);
  // } catch (error) {
  //   console.error("Error uploading file:", error);
  // } finally {
  //   setUploadLoading(false);
  // }
};

export default uploadImage;
