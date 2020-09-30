import React, { useState, useEffect } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import colors, { sizes } from "../../styles/colors";
import { carregarUsuario } from "../../utils";
import BotoesHome from "../../components/BotoesHome";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  faAirFreshener,
  faDog,
  faFan,
  faIdBadge,
  faIdCard,
  faMedkit,
  faNotesMedical,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

export default function Home({ navigation }) {
  const [user] = useState(null);
  const [user_nome, setUser_nome] = useState(null);

  useEffect(() => {
    carregarUsuario()
      .then((usuario) => {
        let primeiro_nome = usuario.nome.split(" ")[0];
        setUser_nome(primeiro_nome);
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
        <ScrollView>
          <SafeAreaView style={styles.safeAreaBotoes}>
            <SafeAreaView style={styles.coluna1}>
              <TouchableOpacity
                style={styles.touchableBotoes}
                onPress={() => {
                  navigation.navigate("Criar Cliente");
                  // Alert.alert("Cliquei", "texto aleatório");
                }}
              >
                <BotoesHome text="Criar Cliente" icon={faIdCard} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableBotoes}
                onPress={() => {
                  Alert.alert("Cliquei", "texto aleatório");
                }}
              >
                <BotoesHome text="Criar Animal" icon={faDog} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableBotoes}
                onPress={() => {
                  Alert.alert("Cliquei", "texto aleatório");
                }}
              >
                <BotoesHome text="Criar Consulta" icon={faNotesMedical} />
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.coluna2}>
              <TouchableOpacity
                style={styles.touchableBotoes}
                onPress={() => {
                  Alert.alert("Cliquei", "texto aleatório");
                }}
              >
                <BotoesHome text="Ver Clientes" icon={faIdBadge} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableBotoes}
                onPress={() => {
                  Alert.alert("Cliquei", "texto aleatório");
                }}
              >
                <BotoesHome text="Ver Animais" icon={faPaw} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableBotoes}
                onPress={() => {
                  Alert.alert("Cliquei", "texto aleatório");
                }}
              >
                <BotoesHome text="Ver Consultas" icon={faMedkit} />
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchableBotoes: {
    borderColor: colors.letraNormalClaro,
    borderWidth: 3,
    marginVertical: 5,
  },
  coluna1: {
    marginLeft: "2%",
    margin: 5,
    padding: 5,
    // height: "40%",
    flex: 1,
    flexDirection: "column",
  },
  coluna2: {
    marginRight: 5,
    marginLeft: "2%",
    margin: 5,
    padding: 5,
    // height: "40%",
    flex: 1,
    flexDirection: "column",
  },
  safeAreaBotoes: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    // maxHeight: "50%",
    maxWidth: "95%",
    marginHorizontal: 5,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPadrao,
  },
  text: {
    fontSize: sizes.letraGrande,
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
