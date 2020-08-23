import { Platform, PixelRatio, Alert, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api from "./services/api";
import { messages } from "./messages";

export function getPixelSize(pixels) {
  //pra pegar o tamanho dos pixels e não dar diferença na densidade de pixels em telas maiores ou menores
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize(pixels), //função que faz a conta de quantos pixels equivalentes estão na tela
  });
}

async function preencherStorage(usuario) {
  try {
    await AsyncStorage.setItem("@appvet:usuario", JSON.stringify(usuario));
    await AsyncStorage.setItem("@appvet:nome", JSON.stringify(usuario.nome));
    console.log("Registrado!");
  } catch (e) {
    console.log(e);
  }
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
    // console.log(response);
    //colocar as c]validações vindas da api
    if (typeof response.data.status == "string") {
      switch (response.data.status) {
        case "Usuario nao encontrado":
          Alert.alert(
            messages.usuario_nao_encontrado,
            messages.tente_novamente
          );
          break;
        case "Senha incorreta":
          Alert.alert(messages.senha_incorreta, messages.tente_novamente);
          break;
        case "Sem conexao com o BD":
          Alert.alert(messages.sem_conexao_BD, messages.contato_dev);
          break;
        default:
          console.log(response.data.status);
          Alert.alert(messages.falha_login, messages.contato_dev);
          break;
      }
      return false;
    }
    await preencherStorage(response.data);
    // console.log(AsyncStorage.getItem("@appvet:data_criacao"));
    ToastAndroid.showWithGravity(
      messages.login_sucesso,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    return true;
  } catch (response) {
    console.log("ENTREI NO CATCH");
    switch (response.problem) {
      case "NETWORK_ERROR":
        Alert.alert(messages.sem_conexao_com_internet);
        console.log("sem conexão com a internet", messages.erro);
        // return messages.sem_conexao_com_internet;
        break;
      case "CONNECTION_ERROR":
        Alert.alert(messages.sem_conexao, messages.erro);
        console.log("Erro de conexão");
        // return messages.sem_conexao;
        break;
      case "SERVER_ERROR":
        Alert.alert(messages.sem_conexao, messages.erro);
        console.log("erro com ose servidor");
        // return messages.sem_conexao;
        break;
      case "TIMEOUT_ERROR":
        Alert.alert(messages.tempo_excedido, messages.erro);
        console.log("Tempo de conexão excedido");
        break;
      // return messages.tempo_excedido;
      default:
        Alert.alert(messages.algo_deu_errado, messages.contato_dev);
        console.log("Erro desconhecido");
        //vai retornar falso lá embaixo
        break;
    }
    return false;
  }
}
