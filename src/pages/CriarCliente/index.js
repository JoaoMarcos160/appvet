import {
  faIdCard,
  faUserCircle,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { stylesPadrao } from "../../styles/colors";
import DescricaoInput from "../../components/DescricaoInput";
import { cpfMask, phoneMask } from "../../utils";

export default function CriarCliente({}) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfMascarado, setCpfMascarado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneMascarado, setTelefoneMascarado] = useState("");

  const inputNome = useRef(null);
  const inputCpf = useRef(null);
  const inputTelefone = useRef(null);

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
              maxLength={14}
              onChangeText={(cpfInput) => {
                setCpfMascarado(cpfMask(cpfInput)); //coloca os pontos e traços nos lugares corretos e exibe através do value
                setCpf(cpfInput.replace(/\D/g, "")); //mantém o cpf sem pontos ou traços
              }}
              value={cpfMascarado}
              clearButtonMode="unless-editing"
              ref={inputCpf}
            />
          </View>
          <View style={stylesPadrao.viewInput}>
            <DescricaoInput text="Telefone: " icon={faPhone} />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Telefone (com DDD)"
              autoCompleteType="off"
              keyboardType="decimal-pad"
              maxLength={15}
              onChangeText={(telefoneInput) => {
                setTelefoneMascarado(phoneMask(telefoneInput));
                setTelefone(telefoneInput.replace(/\D/g, ""));
              }}
              value={telefoneMascarado}
              clearButtonMode="unless-editing"
              ref={inputTelefone}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
