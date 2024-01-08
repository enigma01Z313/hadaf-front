import requests from "../request";

const uploadImage = async (file) => {
  console.log(file);

  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://67.43.234.92:50000/api/files", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: file,
    });

    console.log(response);
    //   const data = await response.json();
    //   changeCurrentSurvayQuestion("media", {
    //     value: `https://p.staticcloud.click/${data.fileName}`,
    //     status: true,
    //     realName: fileName
    //   });
    //   setImgInfo(fileName);
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    // setUploadLoading(false);
  }
};

export default uploadImage;
