import axios from "axios";

export const api = axios.create({
  baseURL: "https://juniorsbootcamp.ru/api/cinema",
});
