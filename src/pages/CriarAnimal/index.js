import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Dimensions,
  Modal,
  TouchableHighlight,
  StyleSheet,
  ToastAndroid,
  Platform,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors, { sizes, stylesPadrao } from "../../styles/colors";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowCircleDown,
  faCat,
  faIdBadge,
  faMicrochip,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import DescricaoInput from "../../components/DescricaoInput";
import {
  criarAnimal,
  dtNascMask,
  getPixelSize,
  listarClientes,
  validarData,
} from "../../utils";
import * as ImagePicker from "expo-image-picker";
import Loading from "../../components/Loading";
import { debounce } from "lodash";

export default function CriarAnimal({ route }) {
  const [nome, setNome] = useState("");
  const [dtNasc, setDtNasc] = useState("");
  const [dtNascMascarado, setDtNascMascarado] = useState("");
  const [cliente_id, setCliente_id] = useState(
    route.params.clienteId ? route.params.clienteId : ""
  );
  const [observacao] = useState("");
  const [microchip] = useState("");
  const [tag] = useState("");
  const [sexo] = useState("");
  const [castrado] = useState("");
  const [cor] = useState("");
  const [image, setImage] = useState(null);
  const [btnCriarAnimal, setBtnCriarAnimal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleInfo, setModalVisibleInfo] = useState(false);
  const [modalVisibleEscolherCliente] = useState(false);
  // const [modalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [, setListaDeClientes] = useState(null);
  const [loadingCriandoAnimal, setLoadingCriandoAnimal] = useState(false);

  const inputNome = useRef(null);
  const inputDtNasc = useRef(null);
  const inputNomeDono = useRef(null);
  const btnSalvar = useRef(null);
  const btnEscolherDaGaleria = useRef(null);
  const btnTirarFoto = useRef(null);

  // useEffect(() => {
  //   listar_clientes();
  // }, []);

const handler = useCallback(debounce(buscar, 2000), []);

const onChange = (event) => {
    // perform any event related action here
    handler();
 };

  useEffect(() => {
    async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Desculpe!",
          "Mas precisamos de acesso a sua câmera para as fotos"
        );
      } else {
        console.log("Permissão da camera ok");
      }
    };
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      setImage(result);
    }
  }

  async function createAnimal() {
    setBtnCriarAnimal(true);
    setLoadingCriandoAnimal(true);
    if (nome == "") {
      Alert.alert(
        "Digite um nome",
        "As outras informações não são obrigatórias, apenas o nome!"
      );
      inputNome.current.focus();
    } else if (dtNasc !== "" && !validarData(dtNascMascarado)) {
      Alert.alert(
        "Data de nascimento inválida!",
        "Por favor verifique a data digitada!"
      );
      inputDtNasc.current.focus();
    } else if (cliente_id == "") {
      Alert.alert(
        "Escolha um cliente!",
        "Todo animal deve ter um cliente vinculado a ele!"
      );
    } else {
      const response = await criarAnimal(
        nome,
        cliente_id,
        dtNasc,
        observacao,
        microchip,
        tag,
        sexo,
        castrado,
        cor,
        image ? image : null
      );
      if (response == true) {
        ToastAndroid.showWithGravity(
          "Animal criado com sucesso",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setNome("");
        setCliente_id("");
        setDtNasc("");
        setDtNascMascarado("");
        setImage(null);
      }
    }
    setBtnCriarAnimal(false);
    setLoadingCriandoAnimal(false);
    return;
  }

  async function listar_clientes() {
    setListaDeClientes(await listarClientes());
  }

  return (
    <SafeAreaView style={stylesPadrao.background}>
      <Header title="Criar Animal" />
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
            *Apenas o nome e o dono são obrigatórios
          </Text>
          {loadingCriandoAnimal &&
            (Platform.OS == "ios" ? (
              <Loading styleView={stylesPadrao.loadingProgressBar} />
            ) : (
              <Loading />
              // <ProgressBarAndroid
              //   styleAttr="Horizontal"
              //   color={colors.letraNormalClaro}
              // />
            ))}
          {loadingCriandoAnimal && (
            <Text style={stylesPadrao.textProgressBar}>Criando animal...</Text>
          )}
        </View>
        <ScrollView>
          <DescricaoInput text="Nome do animal:" icon={faCat} />
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
            onSubmitEditing={() => {
              // inputDtNasc.current.focus();
              listar_clientes();
            }}
            value={nome}
            ref={inputNome}
          />
          <View style={{ flexDirection: "row" }}>
            <DescricaoInput text="Cliente/Dono" icon={faIdBadge} />
            {/* <TouchableHighlight
              activeOpacity={0.8}
              underlayColor={colors.darkblue}
              style={{
                borderColor: colors.letraNormalClaro,
                borderWidth: 1,
                borderRadius: 15,
                marginRight: getPixelSize(4),
                marginLeft: "auto",
                paddingVertical: 8,
                paddingHorizontal: 3,
              }}
              onPress={() => {
                listar_clientes();
                return;
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  color: colors.letraNormalClaro,
                  fontSize: getPixelSize(4),
                }}
              >
                <FontAwesomeIcon
                  icon={faSyncAlt}
                  color={colors.letraNormalClaro}
                />
                Atualizar lista
              </Text>
            </TouchableHighlight> */}
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              style={{ ...stylesPadrao.textInput, marginRight: 5 }}
              placeholder="Digite aqui um nome para buscar"
              placeholderTextColor={colors.placeHolderColor}
              autoCompleteType="off"
              keyboardType="default"
              maxLength={10}
              onChangeText={(nomeDono) => {}}
              onSubmitEditing={() => {}}
              clearButtonMode="unless-editing"
              // value={dtNascMascarado}
              ref={inputNomeDono}
            />
            <FontAwesomeIcon
              icon={faSearch}
              size={sizes.letraGrande}
              color={colors.letraNormalClaro}
              style={{
                ...stylesPadrao.icon,
                marginRight: 5,
                marginLeft: "1%",
                padding: 0,
              }}
            />
            {/* {listaDeClientes == null && <Loading />} */}
          </View>
          <DescricaoInput text="Data de nascimento:" />
          <TextInput
            style={stylesPadrao.textInput}
            placeholder="dd/mm/aaaa"
            placeholderTextColor={colors.placeHolderColor}
            autoCompleteType="off"
            keyboardType="decimal-pad"
            maxLength={10}
            onChangeText={(dtNascInput) => {
              setDtNascMascarado(dtNascMask(dtNascInput));
              setDtNasc(dtNascInput.replace(/\D/g, "-"));
            }}
            onSubmitEditing={() => {
              inputNome.current.focus();
            }}
            clearButtonMode="unless-editing"
            value={dtNascMascarado}
            ref={inputDtNasc}
          />
          {image ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Deseja remover a foto daqui?",
                  "A foto pode não ser excluída do seu celular, apenas removida daqui!",
                  [
                    {
                      text: "Remover foto",
                      style: "destructive",
                      onPress: () => {
                        setImage(null);
                      },
                    },
                    {
                      text: "Deixar como está",
                      style: "default",
                    },
                  ]
                );
              }}
            >
              <Image
                source={{ uri: image.uri }}
                style={{
                  width: "94%",
                  height: Dimensions.get("screen").width * 0.94,
                  alignSelf: "center",
                  borderColor: colors.letraNormalClaro,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={stylesPadrao.button}
              ref={btnSalvar}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={stylesPadrao.textButton}>
                Colocar foto do animal
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ ...stylesPadrao.button, flex: 1, marginHorizontal: 10 }}
            onPress={() => {
              setModalVisibleInfo(true);
            }}
            ref={btnSalvar}
            disabled={btnCriarAnimal}
          >
            <Text style={stylesPadrao.textButton}>
              + Adicionar mais informações
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={stylesPadrao.button}
          onPress={() => {
            createAnimal();
          }}
          ref={btnSalvar}
          disabled={btnCriarAnimal}
        >
          <Text style={stylesPadrao.textButton}>Criar animal</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibleInfo}
      >
        <ScrollView>
          <View style={{ backgroundColor: colors.backgroundPadrao }}>
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
                    setModalVisibleInfo(false);
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
              <DescricaoInput text="Microchip" icon={faMicrochip} />
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            ...stylesPadrao.background,
            alignSelf: "center",
            // paddingVertical: "20%",
            marginVertical: "10%",
            flex: 0,
            width: "95%",
            height: "75%",
            borderRadius: 5,
            borderColor: colors.letraNormalClaro,
            borderWidth: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Header title="Carregar imagens/fotos" />
            <TouchableHighlight
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text
                style={{
                  color: colors.letraNormalClaro,
                  fontSize: getPixelSize(7),
                }}
              >
                X
              </Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            style={{
              ...stylesPadrao.button,
              width: "70%",
              marginTop: 30,
            }}
            ref={btnEscolherDaGaleria}
            onPress={() => {
              setModalVisible(false);
              pickImage();
            }}
          >
            <Text style={stylesPadrao.textButton}>Escolher da galeria</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...stylesPadrao.button, width: "70%" }}
            ref={btnEscolherDaGaleria}
            onPress={() => {
              Alert.alert(
                "Função em desenvolvimento",
                "Ainda estamos trabalhando nessa função! Mas em breve você poderá colocar fotos tiradas na hora! 😉"
              );
              setModalVisible(false);
              // setModalVisibleCamera(true);
            }}
          >
            <Text style={stylesPadrao.textButton}>Tirar uma foto</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...stylesPadrao.button, width: "70%" }}
            ref={btnTirarFoto}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={stylesPadrao.textButton}>Fechar</Text>
          </TouchableHighlight>
        </View>
      </Modal>
      {/*Modal da camera*/}
      {/* <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibleCamera}
        onShow={() => {
          setTimeout(() => {
            setModalVisibleCamera(false);
          }, 40000);
        }}
      >
        <PageCamera />
      </Modal> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleEscolherCliente}
      ></Modal>
    </SafeAreaView>
  );
}
