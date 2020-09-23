import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import { carregarUsuario } from "../../utils";

export default function Home() {
  const [user, setUser] = useState(null);
  const [user_nome, setUser_nome] = useState(null);

  useEffect(() => {
    carregarUsuario()
      .then((usuario) => {
        setUser_nome(usuario.nome);
      })
      .catch((error) => {
        console.warn(error);
      });
    return () => {
      // setUser(null);
      console.log("desmontando user");
    };
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Header title="Home" />

        {user_nome !== null ? (
          <Text style={styles.text}>Bem-vindo(a) {user_nome}</Text>
        ) : (
          <Loading />
        )}
        {/* <Loading /> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPadrao,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    color: colors.letraNormalClaro,
    margin: 5,
  },
  textNome: {
    fontSize: 15,
    textAlign: "center",
    color: colors.letraNormalClaro,
    margin: 5,
  },
});
