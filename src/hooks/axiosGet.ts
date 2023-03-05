import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosGet = async (
  url: string,
  options?: AxiosRequestConfig | undefined
) => {
  try {
    const { data } = await axios.get(url, options);
    return data;
  } catch (error: AxiosError | unknown) {
    return error;
  }
};

export default axiosGet;
