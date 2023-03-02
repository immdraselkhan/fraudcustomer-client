import axios from "axios";

const UploadImage = async (image: String, imageName?: String) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_Server}/upload/image`,
      { image, imageName },
      { headers: { "content-type": "application/json; charset=UTF-8" } }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export default UploadImage;
