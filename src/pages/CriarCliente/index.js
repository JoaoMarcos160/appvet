import {
  faIdCard,
  faUserCircle,
  faPhone,
  faAddressBook,
  faMapMarked,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors, { stylesPadrao } from "../../styles/colors";
import DescricaoInput from "../../components/DescricaoInput";
import {
  buscarEndereçoPeloViaCep,
  cepMask,
  cpfMask,
  getPixelSize,
  phoneMask,
} from "../../utils";
import { apiViaCep } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function CriarCliente({}) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfMascarado, setCpfMascarado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneMascarado, setTelefoneMascarado] = useState("");
  const [cep, setCep] = useState("");
  const [cepMascarado, setCepMascarado] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [dtNasc, setdtNasc] = useState("");
  const [dtNascMascarado, setdtNascMascarado] = useState("");

  const inputNome = useRef(null);
  const inputCpf = useRef(null);
  const inputTelefone = useRef(null);
  const inputCep = useRef(null);
  const inputEndereco = useRef(null);
  const inputCidade = useRef(null);
  const inputEstado = useRef(null);
  const inputDtNasc = useRef(null);
  const btnSalvar = useRef(null);
  //falta por bairro na Api-APPVEt

  async function buscarEndereco(cep) {
    if (cep == "") {
      Alert.alert(
        "Nenhum cep digitado!",
        "Digitando um cep o app buscará algum endereço correspondente ao cep indicado!"
      );
      inputCep.current.focus();
    } else if (cep.length < 8) {
      Alert.alert(
        "Falta algum número no cep!",
        "Digitando um cep o app buscará algum endereço correspondente ao cep indicado!",
        [
          {
            text: "Editar CEP",
            onPress: () => {
              inputCep.current.focus();
            },
          },
          {
            text: "Salvar assim mesmo",
            onPress: () => {
              inputEndereco.current.focus();
            },
            style: "destructive",
          },
        ]
      );
    } else {
      const endereco_retornado = await buscarEndereçoPeloViaCep(cep);
      if (endereco_retornado) {
        if (endereco_retornado.logradouro) {
          setEndereco(endereco_retornado.logradouro);
        }
        if (endereco_retornado.localidade) {
          setCidade(endereco_retornado.localidade);
        }
        if (endereco_retornado.uf) {
          setEstado(endereco_retornado.uf);
        }
        if (telefoneMascarado == "" && endereco_retornado.ddd) {
          setTelefoneMascarado(endereco_retornado.ddd);
        }
        // if(endereco_retornado.bairro){
        //   setEndereco(endereco_retornado.logradouro);
        // }
        return;
      }
      Alert.alert("Nenhum cep encontrado!", "Confira o cep e tente novamente!");
      console.log("Consulta Cep Falhou");
      return;
    }
  }

  return (
    <SafeAreaView style={stylesPadrao.background}>
      <Header title="Cadastrar cliente" />
      <View style={stylesPadrao.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ color: colors.letraNormalClaro, margin: 5, opacity: 0.8 }}
          >
            Role a tela para mais informações
          </Text>
          <FontAwesomeIcon
            icon={faArrowCircleDown}
            color={colors.letraNormalClaro}
          />
        </View>
        <ScrollView>
          <View style={stylesPadrao.viewInput}>
            <DescricaoInput text="Nome: " icon={faUserCircle} />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Digite o nome aqui"
              autoCompleteType="name"
              maxLength={255}
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
            <DescricaoInput text="CEP" icon={faMapMarked} />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Digite o CEP"
              autoCompleteType="off"
              keyboardType="decimal-pad"
              maxLength={10}
              onChangeText={(cepInput) => {
                setCepMascarado(cepMask(cepInput));
                // console.log(cepMascarado);
                setCep(cepInput.replace(/\D/g, ""));
                // console.log(cep);
              }}
              onEndEditing={() => {
                buscarEndereco(cep);
              }}
              onSubmitEditing={() => {
                buscarEndereco(cep);
              }}
              value={cepMascarado}
              clearButtonMode="unless-editing"
              ref={inputCep}
            />
            <DescricaoInput text="Endereço: " icon={faAddressBook} />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Endereço aqui"
              autoCompleteType="street-address"
              keyboardType="ascii-capable"
              maxLength={255}
              onChangeText={(enderecoInput) => {
                setEndereco(enderecoInput);
              }}
              value={endereco}
              clearButtonMode="unless-editing"
              ref={inputEndereco}
            />
            <DescricaoInput text="Cidade" />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Cidade aqui"
              autoCompleteType="street-address"
              keyboardType="ascii-capable"
              maxLength={255}
              onChangeText={(enderecoInput) => {
                setEndereco(enderecoInput);
              }}
              value={cidade}
              clearButtonMode="unless-editing"
              ref={inputCidade}
            />
            <DescricaoInput text="Estado" />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Estado aqui"
              autoCompleteType="street-address"
              keyboardType="ascii-capable"
              maxLength={255}
              onChangeText={(enderecoInput) => {
                setEndereco(enderecoInput);
              }}
              value={estado}
              clearButtonMode="unless-editing"
              ref={inputEstado}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={stylesPadrao.button}
          onPress={() => {
            ToastAndroid.show("Criando...", ToastAndroid.SHORT);
          }}
        >
          <Text style={stylesPadrao.textButton}>Criar cliente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
