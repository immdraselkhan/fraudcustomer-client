import axios, { AxiosError, AxiosRequestConfig } from "axios";

const AxiosPost = async (
  url: string,
  body?: {} | undefined,
  options?: AxiosRequestConfig | undefined
) => {
  try {
    const { data } = await axios.post(url, body, options);
    return data;
  } catch (error: AxiosError | any) {
    return error;
  }
};

export default AxiosPost;
