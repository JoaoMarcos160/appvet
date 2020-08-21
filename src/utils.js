import { Platform, PixelRatio, AsyncStorage } from "react-native";
import dados from "../dados/users.json";
import api from "./services/api";

export function getPixelSize(pixels) {
  //pra pegar o tamanho dos pixels e não dar diferença na densidade de pixels em telas maiores ou menores
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize(pixels), //função que faz a conta de quantos pixels equivalentes estão na tela
  });
}

export async function validarUsuarios(user, password) {
  // console.log("User: " + user);
  // console.log("Password: " + password);
  try {
    const response = await api.get("/Usuarios.php", {
      login: user,
      senha: password,
      tipo: "1",
    });
    if (!response.ok) {
      //conexão deu falha
      if (response.data.status) {
        console.log(response.data.status);
      }
      return false;
    } else {
      if (response.data.status) {
        console.log(response.data.status);
        return response.data.status;
      }
      // await AsyncStorage.multiSet([
      //   ["@appvet:nome", nome],
      //   ["@appvet:codigo", codigo],
      //   ["@appvet:permissao", permissao],
      // ]);
      return true;
    }
  } catch (err) {
    console.log(err);
    console.log("passei aqui2");
    return false;
  }
}
