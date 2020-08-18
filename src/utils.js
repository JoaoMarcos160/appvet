import { Platform, PixelRatio } from "react-native";
import dados from "../dados/users.json";

export function getPixelSize(pixels) {
  //pra pegar o tamanho dos pixels e não dar diferença na densidade de pixels em telas maiores ou menores
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize(pixels), //função que faz a conta de quantos pixels equivalentes estão na tela
  });
}

export function validarUsuarios(user, password) {
  console.log("User: " + user);
  console.log("Password: " + password);
  for (let i = 0; i < dados.users.length; i++) {
    if (dados.users[i].user == user) {
      if (dados.users[i].password == password) {
        return true;
      } else {
        return "incorrect password";
      }
    } else {
      return "user is not found";
    }
  }
  return false;
}
