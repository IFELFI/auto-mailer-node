import { ResponseData } from "src/interfaces/res";

export const generateError = (message: unknown): string => {
  const data: ResponseData = {
    success: false,
    message: JSON.stringify(message),
  };

  return JSON.stringify(data);
};