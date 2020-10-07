import {
  faIdCard,
  faUserCircle,
  faPhone,
  faAddressBook,
  faMapMarked,
  faArrowCircleDown,
  faAddressCard,
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
import colors, { sizes, stylesPadrao } from "../../styles/colors";
import DescricaoInput from "../../components/DescricaoInput";
import {
  buscarEndereçoPeloViaCep,
  cepMask,
  cpfMask,
  dtNascMask,
  getPixelSize,
  phoneMask,
  validarCPF,
  validarData,
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
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [dtNasc, setdtNasc] = useState("");
  const [dtNascMascarado, setdtNascMascarado] = useState("");
  const [btnCriarCliente, setBtnCriarCliente] = useState(false);

  const inputNome = useRef(null);
  const inputCpf = useRef(null);
  const inputTelefone = useRef(null);
  const inputCep = useRef(null);
  const inputEndereco = useRef(null);
  const inputNumero = useRef(null);
  const inputBairro = useRef(null);
  const inputComplemento = useRef(null);
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

  async function createClient() {
    //valida algumas coisas e cria um cliente
    if ("" == nome) {
      Alert.alert(
        "Digite um nome",
        "As outras informações não são obrigatórias, apenas o nome!"
      );
      inputNome.current.focus();
    } else if (
      (cpf != "" && cpf.length < 11) ||
      (cpf.length == 11 && !validarCPF(cpf))
    ) {
      Alert.alert(
        "CPF incorreto ou inválido",
        "Para cadastro o CPF não é obrigatório, porém o CPF digitado não é válido ou está faltando algum número!"
      );
      inputCpf.current.focus();
    } else if (dtNasc !== "" && !validarData(dtNascMascarado)) {
      Alert.alert(
        "Data de nascimento inválida!",
        "Por favor verifique a data digitada!"
      );
      inputDtNasc.current.focus();
    } else {
      ToastAndroid.show("Criando...", ToastAndroid.SHORT);
    }
    setBtnCriarCliente(false);
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
        <View>
          <Text
            style={{
              color: colors.letraNormalClaro,
              marginLeft: 5,
              opacity: 0.8,
              fontSize: sizes.letraMinuscula,
            }}
          >
            *Apenas o nome é obrigatório
          </Text>
        </View>
        <ScrollView>
          <View style={stylesPadrao.viewInput}>
            <DescricaoInput text="*Nome: " icon={faUserCircle} />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Digite o nome aqui"
              autoCompleteType="off"
              autoCapitalize="words"
              maxLength={255}
              onChangeText={(nome) => {
                setNome(nome);
              }}
              ref={inputNome}
              onSubmitEditing={() => {
                inputCpf.current.focus();
              }}
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
              onSubmitEditing={() => {
                inputTelefone.current.focus();
              }}
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
              onSubmitEditing={() => {
                inputCep.current.focus();
              }}
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
              autoCapitalize="words"
              keyboardType="ascii-capable"
              maxLength={255}
              onChangeText={(enderecoInput) => {
                setEndereco(enderecoInput);
              }}
              value={endereco}
              clearButtonMode="unless-editing"
              ref={inputEndereco}
            />
            <DescricaoInput text="Número: " />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Número aqui"
              autoCompleteType="off"
              keyboardType="visible-password"
              maxLength={255}
              onChangeText={(numeroInput) => {
                setNumero(numeroInput);
              }}
              // value={numero}
              clearButtonMode="unless-editing"
              ref={inputNumero}
            />
            <DescricaoInput text="Complemento: " />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Ex.: Apto 23 Bloco 4"
              autoCompleteType="off"
              autoCapitalize="sentences"
              keyboardType="default"
              maxLength={255}
              onChangeText={(complementoInput) => {
                setComplemento(complementoInput);
              }}
              // value={numero}
              clearButtonMode="unless-editing"
              ref={inputBairro}
            />
            <DescricaoInput text="Bairro: " />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Bairro aqui"
              autoCompleteType="off"
              autoCapitalize="words"
              keyboardType="default"
              maxLength={255}
              onChangeText={(bairroInput) => {
                setBairro(bairroInput);
              }}
              // value={numero}
              clearButtonMode="unless-editing"
              ref={inputBairro}
            />
            <DescricaoInput text="Cidade" />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Cidade aqui"
              autoCompleteType="off"
              autoCapitalize="words"
              keyboardType="ascii-capable"
              maxLength={255}
              onChangeText={(cidadeInput) => {
                setCidade(cidadeInput);
              }}
              value={cidade}
              clearButtonMode="unless-editing"
              ref={inputCidade}
            />
            <DescricaoInput text="Estado" />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="Estado aqui"
              autoCompleteType="off"
              autoCapitalize="words"
              keyboardType="ascii-capable"
              maxLength={255}
              onChangeText={(estadoInput) => {
                setEstado(estadoInput);
              }}
              value={estado}
              clearButtonMode="unless-editing"
              ref={inputEstado}
            />
            <DescricaoInput text="Data de nascimento" icon={faAddressCard} />
            <TextInput
              style={stylesPadrao.textInput}
              placeholder="dd/mm/aaaa"
              autoCompleteType="off"
              keyboardType="decimal-pad"
              maxLength={10}
              onChangeText={(dtNascInput) => {
                setdtNascMascarado(dtNascMask(dtNascInput));
                setdtNasc(dtNascInput.replace(/\D/g, "-"));
                // console.log(dtNasc);
              }}
              value={dtNascMascarado}
              clearButtonMode="unless-editing"
              ref={inputDtNasc}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={stylesPadrao.button}
          onPress={() => {
            setBtnCriarCliente(true);
            createClient();
          }}
          ref={btnSalvar}
          disabled={btnCriarCliente}
        >
          <Text style={stylesPadrao.textButton}>Criar cliente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
