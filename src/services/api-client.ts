import axios from "axios";

export const apiClient =  axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "dd4bdb1aaa92456dacd3a85121309c6e",
  },
});
