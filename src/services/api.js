import { create } from "apisauce";

const api = create({
  baseURL: "http://192.168.0.129/appvet/requests",
});

api.addResponseTransform((response) => {
  console.log("duração do request: " + response.duration);
  if (response.data == null) {
    console.log("status:" + response.status);
    return false;
  } else if (response.data.status) {
    console.log("api status: " + response.data.status);
  } else {
    console.log("nome: " + response.data.nome);
  }
  return response;
});

export default api;
