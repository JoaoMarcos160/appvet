import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import colors from "../../styles/colors";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView>
        <Header title="Home" />
        <Text style={styles.text}>Bem-vindo(a) ao AppVet</Text>
        <Loading />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLogin,
  },
  itemLista: {
    textAlign: "center",
    padding: 1,
    margin: 2,
    paddingBottom: 5,
    fontSize: 18,
    borderBottomColor: colors.letraNormalClaro,
    borderBottomWidth: 1,
    color: colors.letraNormalClaro,
  },
  view: {
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
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
  text: {
    fontSize: 30,
    textAlign: "center",
    color: colors.letraNormalClaro,
    margin: 5,
  },
});
