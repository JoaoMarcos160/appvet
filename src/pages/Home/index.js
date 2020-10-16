import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import colors, { sizes } from "../../styles/colors";
import { carregarUsuario, getPixelSize } from "../../utils";
import BotoesHome from "../../components/BotoesHome";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  faBars,
  faDog,
  faHamburger,
  faIdBadge,
  faIdCard,
  faMedkit,
  faNotesMedical,
  faPaw,
  faSearchMinus,
} from "@fortawesome/free-solid-svg-icons";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Home({ navigation }) {
  const [user] = useState(null);
  const [user_nome, setUser_nome] = useState(null);

  useEffect(() => {
    carregarUsuario()
      .then((usuario) => {
        let primeiro_nome = usuario.nome.split(" ")[0];
        setUser_nome(primeiro_nome);
        setTestDeviceIDAsync("EMULATOR");
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
        <View
          style={{
            flexDirection: "row",
            borderColor: colors.letraNormalClaro,
            borderBottomWidth: 1,
            backgroundColor: "#000",
            opacity: 0.9,
            // borderRadius: 8,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0,
              margin: 12,
              padding: 8,
              borderColor: colors.letraNormalClaro,
              borderWidth: 1,
              borderRadius: 5,
              alignContent: "space-between",
            }}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <FontAwesomeIcon
              icon={faBars}
              color={colors.letraNormalClaro}
              size={getPixelSize(10)}
            />
          </TouchableOpacity>
          <Header title="Home" />
        </View>
        <ScrollView
          style={{
            marginBottom: 75,
          }}
          showsVerticalScrollIndicator={true}
          alwaysBounceVertical={true}
        >
          {user_nome !== null ? (
            <Text style={styles.text}>Bem-vindo(a) {user_nome}</Text>
          ) : (
            <Loading />
          )}

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
                  navigation.navigate("Criar Animal");
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
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID="ca-app-pub-1947127811333876/7886829387"
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={(text) => {
              console.log("Erro ao carregar anúncio: ");
              console.log(text);
            }}
            style={{
              borderColor: colors.letraNormalClaro,
              borderWidth: 2,
            }}
          />
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
    padding: 2,
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
