import axiosInstance from "../config/axiosConfig";

export const getAPI = (url, config = {}) => axiosInstance.get(url, config);

export const postAPI = (url, data = {}, config = {}) =>
  axiosInstance.post(url, data, config);

export const putAPI = (url, data = {}, config = {}) =>
  axiosInstance.put(url, data, config);

export const patchAPI = (url, data = {}, config = {}) =>
  axiosInstance.patch(url, data, config);

export const deleteAPI = (url, config = {}) => axiosInstance.delete(url, config);