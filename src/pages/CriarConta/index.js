import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors, { sizes } from "../../styles/colors";
import Header from "../../components/Header";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  faLock,
  faUserAlt,
  faUserCircle,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import { getPixelSize, criarUsuario } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CheckBox from "../../components/CheckBox";

export default function CriarConta({ navigation }) {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [termosDeUso, setTermosDeUso] = useState(false);

  // useEffect(() => {
  //   console.log(termosDeUso);
  // }, [termosDeUso]);
  // useEffect(() => {
  //   console.log(login);
  // }, [login]);
  // useEffect(() => {
  //   console.log(senha);
  // }, [senha]);
  // useEffect(() => {
  //   console.log(senhaConfirm);
  // }, [senhaConfirm]);

  //Referencias dos componentes
  const inputNome = useRef(null);
  const inputLogin = useRef(null);
  const inputSenha = useRef(null);
  const inputSenhaConfirm = useRef(null);

  //Funções
  function handleCheckTermos() {
    setTermosDeUso(!termosDeUso);
  }

  async function criarUser() {
    // console.log(nome);
    // console.log(login);
    // console.log(senha);
    // console.log(senhaConfirm);
    if (nome == "") {
      Alert.alert("Digite seu nome");
      inputNome.current.focus();
    } else if (nome.length < 3) {
      Alert.alert("Nome inválido");
      inputNome.current.focus();
    } else if (nome.search(" ") < 0) {
      Alert.alert("Digite seu nome completo");
      inputNome.current.focus();
    } else if ("" == login) {
      Alert.alert("Digite um login");
      inputLogin.current.focus();
    } else if ("" == senha) {
      Alert.alert("Digite uma senha");
      inputSenha.current.focus();
    } else if ("" == senhaConfirm) {
      Alert.alert("Confime sua senha");
      inputSenhaConfirm.current.focus();
    } else if (senha !== senhaConfirm) {
      Alert.alert(
        "As senhas não coincidem!",
        "As senhas não estão iguais, verifique!"
      );
      inputSenha.current.clear();
      inputSenhaConfirm.current.clear();
      inputSenha.current.focus();
    } else if (senha.length < 6) {
      Alert.alert(
        "Senha muito pequena!",
        "Digite uma senha com pelo menos 6 caracteres"
      );
    } else if (!termosDeUso) {
      Alert.alert(
        "Aceite nossos termos de uso!",
        "Leia atentamente nossos termos de uso do App! 😊"
      );
    } else {
      console.log("Requisição para criar usuario feita!");
      const result = await criarUsuario(nome, login, senha, 1, navigation);
      if (!result) {
        inputLogin.current.clear();
        inputLogin.current.focus();
      } else {
        navigation.navigate("Home");
      }
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      <Header title="Crie sua conta" />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.viewInput}>
            <View style={styles.viewRowIcon}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faUserCircle}
                color={colors.letraNormalClaro}
              />
              <Text style={styles.text}>Nome: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu nome aqui"
              autoCompleteType="name"
              onChangeText={(nome) => {
                setNome(nome);
              }}
              ref={inputNome}
            />
          </View>
          <View style={styles.viewInput}>
            <View style={styles.viewRowIcon}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faUserAlt}
                color={colors.letraNormalClaro}
              />
              <Text style={styles.text}>Login (Nome de Usuário):</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Digite um nome de usuário aqui"
              autoCompleteType="email"
              autoCapitalize="none"
              onChangeText={(login) => {
                setLogin(login);
              }}
              ref={inputLogin}
            />
          </View>
          <View style={styles.viewInput}>
            <View style={styles.viewRowIcon}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faLock}
                color={colors.letraNormalClaro}
              />
              <Text style={styles.text}>Senha (mín. 6 caracteres): </Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Digite uma senha"
              autoCompleteType="password"
              secureTextEntry={true}
              onChangeText={(senha) => {
                setSenha(senha);
              }}
              ref={inputSenha}
            />
          </View>
          <View style={styles.viewInput}>
            <View style={styles.viewRowIcon}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faLock}
                color={colors.letraNormalClaro}
              />
              <Text style={styles.text}>Confirme a senha: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Repita sua senha"
              autoCompleteType="password"
              secureTextEntry={true}
              onChangeText={(senhaconfirm) => {
                setSenhaConfirm(senhaconfirm);
              }}
              ref={inputSenhaConfirm}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {/* Abaixo seria o checkbox mas tá com warning */}
            <View style={{ marginLeft: getPixelSize(5) }}>
              <CheckBox
                checkColor={colors.letraNormalClaro}
                iconColor={colors.letraNormalClaro}
                label="Li e aceito os termos de uso"
                labelStyle={styles.text}
                icon={faCheckSquare}
                showIconInBox={termosDeUso}
                sizeIcon={16}
                onChange={handleCheckTermos}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => criarUser()}>
            <Text style={styles.textButton}>Criar conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableLogin}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnLogin}>
              Já tem uma conta? Faça login aqui
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchableLogin: {
    marginBottom: 5,
  },
  btnLogin: {
    color: colors.letraNormalClaro,
    margin: 2,
    alignSelf: "center",
    fontStyle: "italic",
    textDecorationLine: "underline",
    // borderColor: "red",
    // borderWidth: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "stretch",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.backgroundPadrao,
  },
  text: {
    margin: 10,
    marginBottom: 1,
    marginRight: 0,
    color: colors.letraNormalClaro,
    fontSize: sizes.letraPequena,
    textAlignVertical: "center",
  },
  textInput: {
    width: "auto",
    flex: 1,
    height: getPixelSize(15),
    margin: 7,
    marginTop: 2,
    fontSize: sizes.letraInputs,
    borderRadius: 4,
    padding: 8,
    borderColor: colors.letraNormalClaro,
    borderWidth: 1,
    color: colors.letraNormalClaro,
  },
  viewInput: {
    flexDirection: "column",
  },
  viewRowIcon: {
    flexDirection: "row",
  },
  icon: {
    textAlignVertical: "center",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 3,
    margin: 7,
    marginRight: 0,
    marginBottom: 7,
    // borderColor: "red",
    // borderWidth: 1,
  },
  button: {
    margin: 20,
    width: "auto",
    height: 40,
    borderColor: colors.titulos,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: colors.botoes,
  },
  textButton: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: colors.letraNormalClaro,
    fontSize: sizes.letraPequena,
  },
});
