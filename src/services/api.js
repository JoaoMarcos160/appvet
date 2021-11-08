import { create } from "apisauce";
import { configuracao } from "../config";

const api = create({
  timeout: 10000, //10 segundos
  baseURL: configuracao.desenvolvimento
    ? "http://192.168.0.13:80/api"
    : "https://api.appvet.vet.br/api",
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
