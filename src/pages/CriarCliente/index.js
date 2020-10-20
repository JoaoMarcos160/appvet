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
  Platform,
  ProgressBarAndroid,
  Modal,
  TouchableHighlight,
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
  criarCliente,
  dtNascMask,
  getPixelSize,
  phoneMask,
  validarCPF,
  validarData,
} from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-community/async-storage";
import Loading from "../../components/Loading";
import { AdMobBanner } from "expo-ads-admob";

export default function CriarCliente({ navigation }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfMascarado, setCpfMascarado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneMascarado, setTelefoneMascarado] = useState("");
  const [cep, setCep] = useState("");
  const [cepMascarado, setCepMascarado] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [dtNasc, setdtNasc] = useState("");
  const [dtNascMascarado, setdtNascMascarado] = useState("");
  const [email, setEmail] = useState("");
  const [observacao, setObservacao] = useState("");
  const [btnCriarCliente, setBtnCriarCliente] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

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
  const inputEmail = useRef(null);
  const inputObservacao = useRef(null);
  const btnSalvar = useRef(null);
  const modalInformacoes = useRef(null);
  //falta por bairro na Api-APPVEt

  async function buscarEndereco(cep) {
    if (cep == "") {
      let perguntaCep = await AsyncStorage.getItem("@appvet:perguntarCep");
      if (perguntaCep == "nao") {
        return;
      } else if (cep == "") {
        Alert.alert(
          "Nenhum cep digitado!",
          "Digitando um cep o app buscará algum endereço correspondente ao cep indicado!",
          [
            {
              text: "Não perguntar novamente",
              onPress: () => {
                AsyncStorage.setItem("@appvet:perguntarCep", "nao");
              },
              style: "destructive",
            },
            {
              text: "Ok",
              onPress: () => {
                inputCep.current.focus();
              },
              style: "default",
            },
          ],
          {
            cancelable: false,
          }
        );
      }
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
      setLoadingCep(true);
      const endereco_retornado = await buscarEndereçoPeloViaCep(cep);
      setLoadingCep(false);
      if (endereco_retornado) {
        if (endereco_retornado.logradouro) {
          setEndereco(endereco_retornado.logradouro);
        }
        if (endereco_retornado.bairro) {
          setBairro(endereco_retornado.bairro);
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
        return;
      }
      Alert.alert("Nenhum cep encontrado!", "Confira o cep e tente novamente!");
      console.log("Consulta Cep Falhou");
      return;
    }
  }

  async function createClient() {
    //valida algumas coisas e cria um cliente
    setBtnCriarCliente(true);
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
      let result = await criarCliente(
        nome,
        cpf,
        telefone,
        cep,
        endereco,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        dtNasc,
        email,
        observacao
      );
      if (result) {
        //Sai do foco de todos os campos
        inputNome.current.blur();
        inputCpf.current.blur();
        inputTelefone.current.blur();

        //Seta todos os estados para seu estado inicial e limpa todos os campos
        setNome("");
        setCpf("");
        setCpfMascarado("");
        setTelefone("");
        setTelefoneMascarado("");
        setCep("");
        setCepMascarado("");
        setLoadingCep(false);
        setEndereco("");
        setCidade("");
        setEstado("");
        setNumero("");
        setComplemento("");
        setBairro("");
        setdtNasc("");
        setdtNascMascarado("");
        setEmail("");
        setObservacao("");
        ToastAndroid.showWithGravity(
          "Criado com sucesso",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        navigation.navigate("Home");
      } else {
        ToastAndroid.showWithGravity(
          "Não foi possível criar",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    }
    setBtnCriarCliente(false);
  }

  return (
    <SafeAreaView style={stylesPadrao.background}>
      <Header title="Cadastrar cliente" />
      <View style={stylesPadrao.container}>
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
              placeholderTextColor={colors.placeHolderColor}
              autoCompleteType="off"
              autoCapitalize="words"
              maxLength={255}
              onChangeText={(nome) => {
                setNome(nome);
              }}
              value={nome}
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
              placeholderTextColor={colors.placeHolderColor}
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
              placeholderTextColor={colors.placeHolderColor}
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
                setVisibleModal(true);
                setTimeout(() => {
                  inputCep.current.focus();
                }, 500);
                // Esse setTimeout está aqui pra esperar a animação do Modal acabar
                // e colocar o foco do cursor no campo do cep
              }}
            />
            <TouchableOpacity
              style={{ ...stylesPadrao.button, flex: 1, marginHorizontal: 10 }}
              onPress={() => {
                setVisibleModal(true);
              }}
              ref={btnSalvar}
              disabled={btnCriarCliente}
            >
              <Text style={stylesPadrao.textButton}>
                + Adicionar mais informações
              </Text>
            </TouchableOpacity>
            <Modal
              visible={visibleModal}
              animationType="slide"
              ref={modalInformacoes}
            >
              <ScrollView>
                <View style={stylesPadrao.background}>
                  <View style={stylesPadrao.viewInput}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ marginLeft: 7 }}>
                        <Header title="Outras informações" />
                      </View>
                      <TouchableHighlight
                        onPress={() => {
                          setVisibleModal(false);
                        }}
                        style={{
                          flex: 1,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Text
                          style={{
                            color: colors.letraNormalClaro,
                            fontSize: getPixelSize(7),
                            textAlign: "right",
                            padding: 5,
                            margin: 5,
                          }}
                        >
                          X
                        </Text>
                      </TouchableHighlight>
                    </View>
                    {/* <Text style={stylesPadrao.text}>Outras informações</Text> */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.letraNormalClaro,
                          margin: 5,
                          opacity: 0.8,
                        }}
                      >
                        Role a tela para mais informações
                      </Text>
                      <FontAwesomeIcon
                        icon={faArrowCircleDown}
                        color={colors.letraNormalClaro}
                      />
                    </View>
                    <DescricaoInput text="CEP" icon={faMapMarked} />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="Digite o CEP"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      keyboardType="decimal-pad"
                      maxLength={10}
                      onChangeText={(cepInput) => {
                        if (cepInput.length >= 10) {
                          setCepMascarado(cepMask(cepInput));
                          setCep(cepInput.replace(/\D/g, ""));
                          buscarEndereco(cepInput.replace(/\D/g, ""));
                        } else {
                          setCepMascarado(cepMask(cepInput));
                          setCep(cepInput.replace(/\D/g, ""));
                        }
                      }}
                      onSubmitEditing={() => {
                        inputEndereco.current.focus();
                      }}
                      value={cepMascarado}
                      clearButtonMode="unless-editing"
                      ref={inputCep}
                    />
                    {loadingCep &&
                      (Platform.OS == "ios" ? (
                        <Loading styleView={styles.loadingCepView} />
                      ) : (
                        <ProgressBarAndroid
                          styleAttr="Horizontal"
                          color={colors.letraNormalClaro}
                        />
                      ))}
                    {loadingCep && (
                      <Text style={styles.textBuscandoEndereco}>
                        Buscando endereço pelo CEP, aguarde...
                      </Text>
                    )}
                    <DescricaoInput text="Endereço: " icon={faAddressBook} />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="Endereço aqui"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="street-address"
                      autoCapitalize="words"
                      keyboardType="ascii-capable"
                      maxLength={255}
                      onChangeText={(enderecoInput) => {
                        setEndereco(enderecoInput);
                      }}
                      onSubmitEditing={() => {
                        inputNumero.current.focus();
                      }}
                      editable={!loadingCep}
                      value={endereco}
                      clearButtonMode="unless-editing"
                      ref={inputEndereco}
                    />
                    <DescricaoInput text="Número: " />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="Número aqui"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      keyboardType="visible-password"
                      maxLength={255}
                      onChangeText={(numeroInput) => {
                        setNumero(numeroInput);
                      }}
                      onSubmitEditing={() => {
                        inputComplemento.current.focus();
                      }}
                      editable={!loadingCep}
                      value={numero}
                      clearButtonMode="unless-editing"
                      ref={inputNumero}
                    />
                    <DescricaoInput text="Complemento: " />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="Ex.: Apto 23 Bloco 4"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      autoCapitalize="sentences"
                      keyboardType="default"
                      maxLength={255}
                      onChangeText={(complementoInput) => {
                        setComplemento(complementoInput);
                      }}
                      onSubmitEditing={() => {
                        inputBairro.current.focus();
                      }}
                      editable={!loadingCep}
                      value={complemento}
                      clearButtonMode="unless-editing"
                      ref={inputComplemento}
                    />
                    <DescricaoInput text="Bairro: " />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="Bairro aqui"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      autoCapitalize="words"
                      keyboardType="default"
                      maxLength={255}
                      onChangeText={(bairroInput) => {
                        setBairro(bairroInput);
                      }}
                      onSubmitEditing={() => {
                        inputCidade.current.focus();
                      }}
                      editable={!loadingCep}
                      value={bairro}
                      clearButtonMode="unless-editing"
                      ref={inputBairro}
                    />
                    <DescricaoInput text="Cidade" />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="Cidade aqui"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      autoCapitalize="words"
                      keyboardType="ascii-capable"
                      maxLength={255}
                      onChangeText={(cidadeInput) => {
                        setCidade(cidadeInput);
                      }}
                      onSubmitEditing={() => {
                        inputEstado.current.focus();
                      }}
                      editable={!loadingCep}
                      value={cidade}
                      clearButtonMode="unless-editing"
                      ref={inputCidade}
                    />
                    <DescricaoInput text="Estado" />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="Estado aqui"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      autoCapitalize="words"
                      keyboardType="ascii-capable"
                      maxLength={255}
                      onChangeText={(estadoInput) => {
                        setEstado(estadoInput);
                      }}
                      onSubmitEditing={() => {
                        inputDtNasc.current.focus();
                      }}
                      editable={!loadingCep}
                      value={estado}
                      clearButtonMode="unless-editing"
                      ref={inputEstado}
                    />
                    <DescricaoInput
                      text="Data de nascimento:"
                      icon={faAddressCard}
                    />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="dd/mm/aaaa"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      keyboardType="decimal-pad"
                      maxLength={10}
                      onChangeText={(dtNascInput) => {
                        setdtNascMascarado(dtNascMask(dtNascInput));
                        setdtNasc(dtNascInput.replace(/\D/g, "-"));
                      }}
                      onSubmitEditing={() => {
                        inputEmail.current.focus();
                      }}
                      value={dtNascMascarado}
                      clearButtonMode="unless-editing"
                      ref={inputDtNasc}
                    />
                    <DescricaoInput text="Email:" />
                    <TextInput
                      style={stylesPadrao.textInput}
                      placeholder="Email aqui"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      maxLength={100}
                      onChangeText={(emailInput) => {
                        setEmail(emailInput);
                      }}
                      onSubmitEditing={() => {
                        inputObservacao.current.focus();
                      }}
                      value={email}
                      clearButtonMode="unless-editing"
                      ref={inputEmail}
                    />
                    <DescricaoInput text="Observações:" />
                    <TextInput
                      style={stylesPadrao.multiLineTextInput}
                      placeholder="Coloque aqui suas observações"
                      placeholderTextColor={colors.placeHolderColor}
                      autoCompleteType="off"
                      autoCapitalize="sentences"
                      keyboardType="default"
                      // maxLength={5000}
                      onChangeText={(observacaoInput) => {
                        setObservacao(observacaoInput);
                      }}
                      onSubmitEditing={() => {
                        createClient();
                      }}
                      multiline={true}
                      numberOfLines={8}
                      value={observacao}
                      clearButtonMode="unless-editing"
                      ref={inputObservacao}
                    />
                    <TouchableOpacity
                      style={stylesPadrao.button}
                      onPress={() => {
                        setVisibleModal(false);
                      }}
                    >
                      <Text style={stylesPadrao.textButton}>
                        Salvar e voltar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <AdMobBanner
                  bannerSize="smartBannerPortrait"
                  // adUnitID="ca-app-pub-3940256099942544/6300978111"
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
            </Modal>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={stylesPadrao.button}
          onPress={() => {
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

const styles = StyleSheet.create({
  loadingCepView: {
    flexWrap: "wrap",
    margin: 0,
  },
  textBuscandoEndereco: {
    color: colors.letraNormalClaro,
    fontSize: sizes.letraPequena,
    textAlign: "center",
    borderBottomColor: colors.letraNormalClaro,
    borderBottomWidth: 2,
  },
});
