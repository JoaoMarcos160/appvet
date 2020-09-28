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

export async function carregarUsuario() {
  try {
    const user = await AsyncStorage.getItem("@appvet:usuario");
    const userJson = JSON.parse(user);
    console.log(userJson);
    return userJson;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

async function preencherUsuario(usuario_id) {
  try {
    // Tem que passi o id do usuario pra a função preencherUsuario() buscar o usuario na api
    await AsyncStorage.clear();
    const response = await api.get("/usuarios/" + usuario_id);
    if (response.data.data.id) {
      await AsyncStorage.setItem(
        "@appvet:usuario",
        JSON.stringify(response.data.data)
      );
      console.log("Registrado!");
    }
  } catch (e) {
    console.log("Deu erro em preencherUsuario");
    if (e.data.data.msg) {
      Alert.alert(e.data.data.msg);
      console.log(e);
    }
  }
}

async function preencherToken(token) {
  try {
    await AsyncStorage.setItem("@appvet:token", token);
    console.log("Token registrado!");
  } catch (e) {
    console.log(e);
  }
}

export async function criarUsuario(nome, login, senha, permissao, navigation) {
  console.log("Nome: " + nome);
  try {
    const response = await api.post("/usuarios/", {
      login: login,
      senha: senha,
      nome: nome,
      permissao: permissao ? permissao : 1,
    });
    // console.log(response.data.data);
    if (response.data.data.msg == "Criado com sucesso") {
      // await preencherStorage(response.data);
      await AsyncStorage.clear();
      await preencherUsuario(response.data.data.id);
      await preencherToken(response.data.data.token);
      // console.log(AsyncStorage.getItem("@appvet:data_criacao"));
      ToastAndroid.showWithGravity(
        messages.criar_conta_sucesso,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return true;
    }
    Alert.alert(response.data.data.msg);
    return false;
  } catch (response) {
    console.log("ENTREI NO CATCH");
    console.log(response.problem);
    alertsProblemaConexao(response.problem);
    return false;
  }
}

export async function validarUsuarios(user, password) {
  // console.log("User: " + user);
  // console.log("Password: " + password);
  try {
    const response = await api.post("/usuarios/login", {
      login: user,
      senha: password,
    });
    // console.log(response.data.data);
    if (response.data.data.msg == "Sucesso") {
      // await preencherStorage(response.data);
      await AsyncStorage.clear();
      await preencherToken(response.data.data.token);
      await preencherUsuario(response.data.data.id);
      // console.log(AsyncStorage.getItem("@appvet:data_criacao"));
      ToastAndroid.showWithGravity(
        messages.login_sucesso,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return true;
    }
    Alert.alert(response.data.data.msg);
    return false;
  } catch (response) {
    console.log("ENTREI NO CATCH");
    console.log(response.problem);
    alertsProblemaConexao(response.problem);
    return false;
  }
}

async function alertsProblemaConexao(problem) {
  switch (problem) {
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
      console.log("erro com o servidor");
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
      break;
  }
}
