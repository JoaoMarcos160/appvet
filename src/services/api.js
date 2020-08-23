import { create } from "apisauce";

const api = create({
  timeout: 20000, //20 segundos
  baseURL: "http://192.168.0.129/appvet/requests",
  // baseURL: "https://pablo.atmun.com/TCC/Telas/requests",
});

api.addResponseTransform((response) => {
  console.log("Duração do request: " + response.duration);
  // console.log(response.data.status);
  if (!response.ok) throw response;
});

export default api;
