import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  ListView,
  VirtualizedList,
} from "react-native";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import doencas from "../../../dados/doencas.json";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  //Funções
  const getItem = (data, index) => {
    // console.log("index: " + index);
    // console.log("data: " + data[index].nome);
    return {
      id: index + 1,
      nome: data[index].nome,
      // nome: data[index + 1]["nome"],
    };
  };

  const getItemCount = (data) => {
    let total = Math.round(doencas.doencas.length / 4);
    // console.log("total: " + total);
    return total;
  };
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <KeyboardAvoidingView>
        <SafeAreaView>
          <Header />
          <Text>Doenças conhecidas</Text>
          <VirtualizedList
            data={doencas.doencas}
            initialNumToRender={0}
            renderItem={({ item }) => (
              <Text>
                {item.id}: {item.nome}
              </Text>
            )}
            keyExtractor={(item) => item.nome}
            getItemCount={getItemCount}
            getItem={getItem}
            ListEmptyComponent={<Text>Sem itens na lista!</Text>}
            pagingEnabled={true}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
