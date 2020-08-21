import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors, { sizes } from "../../styles/colors";
import Header from "../../components/Header";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  faCalculator,
  faLock,
  faUserAlt,
  faUserAltSlash,
  faUserAstronaut,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getPixelSize } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { color } from "react-native-reanimated";

export default function CriarConta() {
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
            />
          </View>
          <View style={styles.viewInput}>
            <View style={styles.viewRowIcon}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faUserAlt}
                color={colors.letraNormalClaro}
              />
              <Text style={styles.text}>Login: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Digite um nome de usuário aqui"
              autoCompleteType="email"
            />
          </View>
          <View style={styles.viewInput}>
            <View style={styles.viewRowIcon}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faLock}
                color={colors.letraNormalClaro}
              />
              <Text style={styles.text}>Senha: </Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Digite uma senha"
              autoCompleteType="password"
              secureTextEntry={true}
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
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "stretch",
    alignSelf: "center",
    justifyContent: "space-between",
    // borderColor: "red",
    // borderWidth: 1,
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
    // borderColor: "red",
    // borderWidth: 1,
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
    backgroundColor: colors.corBoxes,
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
