import { faIdCard, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { stylesPadrao } from "../../styles/colors";
import DescricaoInput from "../../components/DescricaoInput";
import { cpfMask } from "../../utils";

export default function CriarCliente({}) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  const inputNome = useRef(null);
  const inputCpf = useRef(null);
  return (
    <SafeAreaView style={stylesPadrao.background}>
      <Header title="Cadastrar cliente" />
      <View style={stylesPadrao.container}>
        <ScrollView>
          <View style={stylesPadrao.viewInput}>
            <DescricaoInput text="Nome: " icon={faUserCircle} />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Digite o nome aqui"
              autoCompleteType="name"
              onChangeText={(nome) => {
                setNome(nome);
              }}
              ref={inputNome}
            />
          </View>
          <View style={stylesPadrao.viewInput}>
            <DescricaoInput text="CPF: " icon={faIdCard} />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="CPF (apenas números)"
              autoCompleteType="off"
              keyboardType="decimal-pad"
              maxLength={11}
              onChangeText={(cpf) => {
                // console.log(cpfMask(cpf));
                setCpf(cpf);
              }}
              ref={inputCpf}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
