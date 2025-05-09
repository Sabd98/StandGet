import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpMethod } from "../utils/interfaces";
import { useCallback, useState } from "react";

// useHttp.ts
interface HttpRequestConfig {
  url: string;
  method: HttpMethod;
  data?: unknown;
  headers?: Record<string, string>;
}

//Send Http Req Handler
const sendHttpReq = async <T>(config: HttpRequestConfig): Promise<T> => {
  try {
    const token = localStorage.getItem("token");

    const response: AxiosResponse<T> = await axios({
      method: config.method,
      url: config.url,
      data: config.data,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

     if (axiosError.response?.status === 404) {
       console.log("Not Found:", axiosError.message); // Example of valid statement
     }

    throw new Error(
      axiosError.response?.data?.message || "Failed to send request"
    );
  }
};

//Hopk HTTP Main Code
export default function useHttp<T = unknown>() {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async(config: HttpRequestConfig): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const responseData = await sendHttpReq<T>(config);
        setData(responseData);
        return responseData;
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, sendRequest, setError, setData };
}
