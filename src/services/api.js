import { create } from "apisauce";

const api = create({
  baseURL: "http://192.168.0.129/appvet/requests",
});

api.addResponseTransform((response) => {
  console.log("duração do request: " + response.duration);
  console.log(response.config.method);
  if (response.data == null) {
    console.log("status:" + response.status);
  } else {
    console.log("add: " + response.data.nome);
  }
});

export default api;
