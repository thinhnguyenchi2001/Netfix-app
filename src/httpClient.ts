import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("userToken");
  const bearer = token ? `Bearer ${token}` : "";

  return bearer;
};

export const httpClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  headers: {
    // Authorization: getToken(),
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: "85b8f8fbb0481197657035bf84174e27",
    // session_id: "8d88087b2e9e9419909f79572939b12d2889abaa",
  },
});

httpClient.interceptors.request.use((config: any) => {
  config.headers.Authorization = getToken();
  return config;
});

// https://api.themoviedb.org/3/account/12082652/?api_key=85b8f8fbb0481197657035bf84174e27&session_id=8d88087b2e9e9419909f79572939b12d2889abaa
// https://api.themoviedb.org/3/account//favorite?api_key=85b8f8fbb0481197657035bf84174e27&session_id=8d88087b2e9e9419909f79572939b12d2889abaa
