import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors, { sizes, stylesPadrao } from "../../styles/colors";
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
import DescricaoInput from "../../components/DescricaoInput";

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
    const regex_email =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (nome == "") {
      Alert.alert("Digite seu nome");
      inputNome.current.focus();
      return;
    }
    if (nome.length < 3) {
      Alert.alert("Nome inválido");
      inputNome.current.focus();
      return;
    }
    if (nome.search(" ") < 0) {
      Alert.alert("Digite seu nome completo");
      inputNome.current.focus();
      return;
    }
    if ("" == login) {
      Alert.alert("Digite um login");
      inputLogin.current.focus();
      return;
    }
    if (!regex_email.test(login)) {
      Alert.alert("Email inválido");
      inputLogin.current.focus();
      return;
    }
    if ("" == senha) {
      Alert.alert("Digite uma senha");
      inputSenha.current.focus();
      return;
    }
    if ("" == senhaConfirm) {
      Alert.alert("Confime sua senha");
      inputSenhaConfirm.current.focus();
      return;
    }
    if (senha !== senhaConfirm) {
      Alert.alert(
        "As senhas não coincidem!",
        "As senhas não estão iguais, verifique!"
      );
      inputSenha.current.clear();
      inputSenhaConfirm.current.clear();
      inputSenha.current.focus();
      return;
    }
    if (senha.length < 6) {
      Alert.alert(
        "Senha muito pequena!",
        "Digite uma senha com pelo menos 6 caracteres"
      );
      return;
    }
    if (!termosDeUso) {
      Alert.alert(
        "Aceite nossos termos de uso!",
        "Leia atentamente nossos termos de uso do App! 😊"
      );
      return;
    }
    console.log("Requisição para criar usuario feita!");
    const result = await criarUsuario(nome, login, senha, 1, navigation);
    if (!result) {
      inputLogin.current.clear();
      inputLogin.current.focus();
    } else {
      navigation.navigate("Home");
    }
  }

  return (
    <SafeAreaView style={stylesPadrao.background}>
      <Header title="Crie sua conta" />
      <View style={stylesPadrao.container}>
        <ScrollView>
          <View style={styles.viewInput}>
            <DescricaoInput text="Nome: " icon={faUserCircle} />
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu nome aqui"
              placeholderTextColor={colors.placeHolderColor}
              autoCompleteType="name"
              onChangeText={(nome) => {
                setNome(nome);
              }}
              ref={inputNome}
            />
          </View>
          <View style={styles.viewInput}>
            <DescricaoInput text="Email:" icon={faUserAlt} />
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu email aqui"
              placeholderTextColor={colors.placeHolderColor}
              autoCompleteType="email"
              autoCapitalize="none"
              onChangeText={(login) => {
                setLogin(login);
              }}
              ref={inputLogin}
            />
          </View>
          <View style={styles.viewInput}>
            <DescricaoInput text="Senha (mín. 6 caracteres):" icon={faLock} />
            <TextInput
              style={styles.textInput}
              placeholder="Digite uma senha"
              placeholderTextColor={colors.placeHolderColor}
              autoCompleteType="password"
              secureTextEntry={true}
              onChangeText={(senha) => {
                setSenha(senha);
              }}
              ref={inputSenha}
            />
          </View>
          <View style={styles.viewInput}>
            <DescricaoInput text="Confirme a senha:" icon={faLock} />
            <TextInput
              style={styles.textInput}
              placeholder="Repita sua senha"
              placeholderTextColor={colors.placeHolderColor}
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
