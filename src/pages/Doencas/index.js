import React, { useState, useEffect } from "react";
import {
  Text,
  KeyboardAvoidingView,
  VirtualizedList,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import doencas from "../../../dados/doencas.json";
import { TouchableHighlight } from "react-native-gesture-handler";
import colors from "../../styles/colors";
import Loading from "../../components/Loading";

export default function Doencas() {
  const [seachDoenca, setSeachDoenca] = useState("");
  const [dados] = useState(doencas.doencas);
  const [loading, setLoading] = useState(false);
  const [paginable, setpaginable] = useState(true);

  useEffect(() => {
    // console.log("passei aqui");
  }, [seachDoenca]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  function paginar() {
    // console.log(dados.length);
    if (dados.length % 8 != 0) {
      setpaginable(false);
    }
  }

  //Funções
  const getItem = (data, index) => {
    if (index >= dados.length) {
      setLoading(false);
      // console.log("passei no false");
    } else {
      setLoading(true);
      // console.log("passei no true");
    }
    paginar();
    let nome = data[index].nome;
    if (nome === undefined) {
      console.log(index);
      return {
        id: index + 1,
        nome: "Sem nome",
      };
    } else if (
      //esse monte de coisa aqui é pra tirar os acentos na pesquisa e no que é pesquisado
      nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .indexOf(
          seachDoenca
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) > -1
    ) {
      return {
        id: index + 1,
        nome: data[index].nome,
      };
    } else if (seachDoenca == "") {
      return {
        id: index + 1,
        nome: data[index].nome,
      };
    }
    return null;
  };

  const getItemCount = () => {
    // return dados.length;
    return dados.length;
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="light" /> */}
      <KeyboardAvoidingView>
        <Header title="Doenças" />
        <SafeAreaView style={styles.view}>
          <TextInput
            style={styles.inputs}
            placeholder="Digite aqui a doença"
            autoCorrect={false}
            onChangeText={(pesquisa) => {
              setSeachDoenca(pesquisa);
            }}
            onSubmitEditing={() => {}}
          />
          <Text style={styles.text}>Doenças localizadas: </Text>
          {!loading && <Loading />}
          <VirtualizedList
            style={{
              margin: 5,
              padding: 5,
              borderColor: colors.letraNormalClaro,
            }}
            showsVerticalScrollIndicator={true}
            data={dados}
            initialNumToRender={30}
            renderItem={({ item }) =>
              item && (
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert(
                      item.nome,
                      "Clique em " + item.id + ": " + item.nome
                    );
                  }}
                >
                  <Text style={styles.itemLista}>
                    {/* {index}: {item.nome} */}
                    {item.nome}
                  </Text>
                </TouchableHighlight>
              )
            }
            keyExtractor={(item) => {
              if (item == null) {
                return Math.random();
              }
              return item.id;
            }}
            getItemCount={getItemCount}
            getItem={getItem}
            ListEmptyComponent={<Text>Sem itens na lista!</Text>}
            pagingEnabled={paginable}
          />
        </SafeAreaView>
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
    // alignItems: "center",
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
    alignSelf: "center",
  },
  text: {
    color: colors.letraNormalClaro,
    margin: 5,
    textAlign: "left",
  },
});
