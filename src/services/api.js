import { create } from "apisauce";

const api = create({
  timeout: 20000, //20 segundos
  baseURL: "http://192.168.0.129:80/api",
  // baseURL: "https://pablo.atmun.com/TCC/Telas/requests",
});

api.addResponseTransform((response) => {
  console.log("Duração do request AppVet: " + response.duration);
  // console.log(response.data.status);
  if (!response.ok) throw response;
});

export const apiViaCep = create({
  timeout: 20000,
  baseURL: "https://viacep.com.br/ws",
});

apiViaCep.addResponseTransform((response) => {
  console.log("Duração do request ViaCep: " + response.duration);
  if (!response.ok) throw response;
});

export default api;
