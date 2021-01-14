import { Platform, PixelRatio, Alert, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api, { apiViaCep } from "./services/api";
import { messages } from "./messages";
import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";

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
    // console.log(userJson);
    return userJson;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

async function preencherUsuario(usuario_id) {
  try {
    // Tem que passi o id do usuario pra a função preencherUsuario() buscar o usuario na api
    await AsyncStorage.removeItem("@appvet:usuario");
    const response = await api.get("/usuarios/" + usuario_id);
    if (response.data.data.id) {
      await AsyncStorage.setItem(
        "@appvet:usuario",
        JSON.stringify(response.data.data)
      );
      console.log("Usuario registrado!");
    }
  } catch (e) {
    console.log("Deu erro em preencherUsuario");
    if (e.data.data.msg) {
      Alert.alert(e.data.data.msg);
      console.warn(e);
    }
  }
}

async function preencherToken(token) {
  try {
    await AsyncStorage.setItem("@appvet:token", token);
    console.log("Token " + token + " registrado!");
  } catch (e) {
    console.warn(e);
  }
}

export async function criarUsuario(nome, login, senha, permissao, navigation) {
  console.log("Nome: " + nome);
  try {
    const response = await api.post("/usuarios", {
      login: login,
      senha: senha,
      nome: nome,
      permissao: permissao ? permissao : 1,
    });
    // console.log(response.data.data);
    if (response.data.data.msg == "Criado com sucesso") {
      await AsyncStorage.clear();
      // await AsyncStorage.multiRemove(["@appvet:token", "@appvet:usuario"]);
      await preencherUsuario(response.data.data.id);
      await preencherToken(response.data.data.token);
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
    console.warn(response);
    alertsProblemaConexao(response.problem);
    return false;
  }
}

function converterDataParaApi(dtNasc) {
  if (dtNasc !== undefined && dtNasc !== null && dtNasc !== "") {
    let dia = dtNasc.split("-")[0];
    let mes = dtNasc.split("-")[1];
    let ano = dtNasc.split("-")[2];
    let dtConvertida;
    return (dtConvertida =
      ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2));
  }
  return "";
}

export async function criarCliente(
  nome,
  cpf,
  telefone,
  cep,
  endereco,
  numero,
  bairro,
  complemento,
  cidade,
  estado,
  dtNasc,
  email,
  observacao
) {
  try {
    const token = await AsyncStorage.getItem("@appvet:token");
    const usuario = await carregarUsuario();
    let dtConvertida = converterDataParaApi(dtNasc);

    const response = await api.post("/clientes", {
      token: token,
      usuario_id: usuario.id,
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      cep: cep,
      endereco: endereco,
      numero: numero,
      bairro: bairro,
      complemento: complemento,
      cidade: cidade,
      estado: estado,
      dt_nasc: dtConvertida,
      email: email,
      observacao: observacao,
    });
    console.log(response.data.data);
    if (response.status == 201) {
      return response.data.data.id;
    }
    return false;
  } catch (response) {
    console.warn(response);
    if (response.data.data.msg) {
      Alert.alert(response.problem, response.data.data.msg);
    } else if (response.problem) {
      // console.log(response.problem);
      alertsProblemaConexao(response.problem);
    }
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
      console.log("Logado com sucesso");
      // await AsyncStorage.clear();
      await preencherToken(response.data.data.token);
      await preencherUsuario(response.data.data.id);
      // console.log(AsyncStorage.getItem("@appvet:data_criacao"));
      ToastAndroid.show(messages.login_sucesso, ToastAndroid.SHORT);
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
      Alert.alert(messages.erro_com_servidor, messages.tente_novamente);
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

export async function mostrarPropaganda() {
  await AdMobInterstitial.setAdUnitID("ca-app-pub-1947127811333876/9381235264");
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  await AdMobInterstitial.showAdAsync();
}

export async function mostrarPropagandaComRecompensa() {
  await AdMobRewarded.setAdUnitID("ca-app-pub-1947127811333876/2417722735");
  await AdMobRewarded.requestAdAsync();
  await AdMobRewarded.showAdAsync();
  return;
}

export async function listarClientes() {
  const token = await AsyncStorage.getItem("@appvet:token");
  const usuario = await carregarUsuario();
  try {
    const response = await api.post("/clientes/listar", {
      token: token,
      usuario_id: usuario.id,
    });
    // console.log(response.data.data);
    if (response.status == 200) {
      if (response.data.data.msg == "Nenhum cliente encontrado") {
        console.log(response.data.data.msg);
        return false;
      }
      console.log("Clientes listados com sucesso");
      return response.data.data;
    }
    Alert.alert(response.data.data.msg);
    return false;
  } catch (response) {
    console.log("ENTREI NO CATCH");
    console.log("response: ");
    console.table(response);
    alertsProblemaConexao(response.problem);
    return false;
  }
}

export async function criarAnimal(
  nome_animal,
  cliente_id,
  dt_nasc,
  observacao,
  microchip,
  tag,
  sexo,
  castrado,
  cor,
  foto = null
) {
  const token = await AsyncStorage.getItem("@appvet:token");
  const usuario = await carregarUsuario();
  const dtConvertida = converterDataParaApi(dt_nasc);
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  try {
    var response;
    if (foto == null) {
      response = await api.post("/animais", {
        token: token,
        usuario_id: usuario.id,
        nome_animal: nome_animal,
        cliente_id: cliente_id,
        dt_nasc: dtConvertida,
        observacao: observacao,
        microchip: microchip,
        tag: tag,
        sexo: sexo,
        castrado: castrado,
        cor: cor,
      });
    } else {
      const form = new FormData();
      form.append(
        "foto_animal",
        {
          uri: foto.uri,
          name: "image.jpg",
          type: "image/jpeg",
        },
        "foto_animal.jpg"
      );
      form.append("token", token);
      form.append("usuario_id", usuario.id);
      form.append("nome_animal", nome_animal);
      form.append("cliente_id", cliente_id);
      form.append("dt_nasc", dtConvertida);
      form.append("microchip", microchip);
      form.append("tag", tag);
      form.append("sexo", sexo);
      form.append("castrado", castrado);
      form.append("cor", cor);

      response = await api.post("/animais", form, { ...headers });
    }
    console.log(response);
    if (response.status == 201) {
      console.log("Animal criado com sucesso");
      return true;
    }
    if (response.data.data.msg != undefined) {
      Alert.alert(response.data.data.msg);
    } else {
      Alert.alert(messages.algo_deu_errado, messages.contato_dev);
    }
    return false;
  } catch (response) {
    console.log("ENTREI NO CATCH");
    console.log("response: ");
    console.log(response);
    alertsProblemaConexao(response.problem);
    return false;
  }
}

async function buscarClientes(
  nome,
  cpf,
  telefone,
  endereco,
  numero,
  bairro,
  complemento,
  cidade,
  estado,
  cep,
  dt_nasc,
  observacao,
  email,
  created_at,
  updated_at
) {
  try {
    //colocar aqui pra buscar na api pelos parametros acima listados
  } catch (response) {
    console.error(response);
  }
}
