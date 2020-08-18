import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  Vibration,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAddressCard, faLock } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/colors";
import icon from "../../../assets/icon.png";
import { StatusBar } from "expo-status-bar";
import Loading from "../../components/Loading";
import { validarUsuarios } from "../../utils";

export default function Login({ navigation }) {
  const tamanhoLogo = {
    x: 140,
    y: 140,
  };

  const [senhaInvisivel, setSenhaInvisivel] = useState(true);
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(password);
  }, [password]);

  //Animações
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(
    new Animated.ValueXY({ x: tamanhoLogo.x, y: tamanhoLogo.y })
  );
  const useNativeDriver = false;

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: useNativeDriver,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: useNativeDriver,
      }),
    ]).start();
  }, []);

  //Referencias
  const inputUser = useRef(null);
  const inputPassword = useRef(null);

  //Funções
  function validaUsuario(user, password) {
    let result = validarUsuarios(user, password);
    console.log(result);
    if (result == "user is not found") {
      Alert.alert(
        "Usuario não encontrado!",
        "Não encotramos seu usuário cadastrado!"
      );
    } else if (result == "incorrect password") {
      Alert.alert("Senha incorreta!", "Sua senha está incorreta!\nVerifique");
    } else if (result) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Algo deu errado!");
    }
  }

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        useNativeDriver: useNativeDriver,
      }),
      Animated.timing(logo.y, {
        toValue: 55,
        duration: 100,
        useNativeDriver: useNativeDriver,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: tamanhoLogo.y,
        duration: 100,
        useNativeDriver: useNativeDriver,
      }),
      Animated.timing(logo.y, {
        toValue: tamanhoLogo.y,
        duration: 100,
        useNativeDriver: useNativeDriver,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <StatusBar style="light" />
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={icon}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{ translateY: offset.y }],
          },
        ]}
      >
        <View style={styles.viewInput}>
          <FontAwesomeIcon
            icon={faAddressCard}
            color={colors.letraNormalClaro}
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            focusable={true}
            onChangeText={(user) => {
              setUser(user);
            }}
            onSubmitEditing={() => {
              inputPassword.current.focus();
            }}
            ref={inputUser}
          />
        </View>
        <View style={styles.viewInput}>
          <FontAwesomeIcon
            icon={faLock}
            color={colors.letraNormalClaro}
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Senha"
            autoCompleteType="password"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(password) => {
              setPassword(password);
            }}
            onSubmitEditing={() => {
              validaUsuario(user, password);
            }}
            ref={inputPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => {
            // validaUsuario(user, password);
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta</Text>
        </TouchableOpacity>
      </Animated.View>
      {/* <View>
        <Loading />
      </View> */}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  iconStyle: {
    margin: 5,
    padding: 10,
    textAlignVertical: "center",
    marginBottom: 20,
  },
  viewInput: {
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingBottom: 90,
  },
  background: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: colors.backgroundLogin,
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 30,
  },
  inputs: {
    width: "90%",
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.letraNormalClaro,
    borderWidth: 1,
    color: colors.letraNormalClaro,
  },
  btnSubmit: {
    marginTop: 20,
    backgroundColor: "#35aaff",
    width: "60%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  submitText: {
    color: colors.letraNormalClaro,
    fontSize: 18,
  },
  btnRegister: {
    color: colors.letraNormalClaro,
    marginTop: 10,
  },
  registerText: {
    color: colors.letraNormalClaro,
  },
});