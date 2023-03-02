import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosPost = async (
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

export default axiosPost;
