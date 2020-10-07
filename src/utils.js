import { Platform, PixelRatio, Alert, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api, { apiViaCep } from "./services/api";
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
    if (response.data.data.code == 1020) {
      Alert.alert(
        response.data.data.msg,
        "Deseja tentar voltar e logar com essa conta ou continuar a criação de uma nova conta?",
        [
          {
            text: "Voltar ao login",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
          {
            text: "Continuar",
            onPress: () => {},
          },
        ]
      );
      return false;
    }
    console.log(response.data.data);
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
    console.log("response: ");
    console.log(response);
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

export const cpfMask = (value) => {
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export function cepMask(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2");
}

export function phoneMask(value) {
  let tamanho = value.replace(/\D/g, "").length;
  if (tamanho < 11) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,2})/, "$1-$2");
  } else {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,2})/, "$1-$2");
  }
}

export function dtNascMask(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d{1,4})/, "$1/$2");
}

export function validarData(data) {
  var patternValidaData = /^(((0[1-9]|[12][0-9]|3[01])([-.\/])(0[13578]|10|12)([-.\/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-.\/])(0[469]|11)([-.\/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-.\/])(02)([-.\/])(\d{4}))|((29)(\.|-|\/)(02)([-.\/])([02468][048]00))|((29)([-.\/])(02)([-.\/])([13579][26]00))|((29)([-.\/])(02)([-.\/])([0-9][0-9][0][48]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][2468][048]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][13579][26])))$/;
  if (patternValidaData.test(data)) {
    return true;
  }
  return false;
}

export function validarCPF(cpf) {
  if (cpf == undefined) return false;
  var cpfTratado = cpf.replace(/\D/g, "");
  if (cpfTratado.length != 11) {
    return false;
  }
  if (TestaCPF(cpfTratado)) {
    return true;
  }
  return false;
}

function TestaCPF(strCPF) {
  var Soma;
  var Resto;
  var i;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

export async function buscarEndereçoPeloViaCep(cep) {
  try {
    let endereco_json = await apiViaCep.get("/" + cep + "/json");
    // console.log(endereco_json.data);
    if (endereco_json.data.erro) {
      return false;
    }
    return endereco_json.data;
  } catch (error) {
    console.log("Erro na consulta ViaCep");
    console.log(error);
    return false;
  }
}
