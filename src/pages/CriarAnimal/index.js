import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Dimensions,
  Modal,
  Button,
  TouchableHighlight,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors, { sizes, stylesPadrao } from "../../styles/colors";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowCircleDown, faCat } from "@fortawesome/free-solid-svg-icons";
import DescricaoInput from "../../components/DescricaoInput";
import { dtNascMask, getPixelSize, validarData } from "../../utils";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export default function CriarAnimal({ navigation }) {
  const [nome, setNome] = useState("");
  const [dtNasc, setDtNasc] = useState("");
  const [dtNascMascarado, setDtNascMascarado] = useState("");
  const [image, setImage] = useState(null);
  const [btnCriarAnimal, setBtnCriarAnimal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const inputNome = useRef(null);
  const inputDtNasc = useRef(null);
  const btnSalvar = useRef(null);
  const btnEscolherDaGaleria = useRef(null);
  const btnTirarFoto = useRef(null);

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
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  async function createAnimal() {
    setBtnCriarAnimal(true);
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
    } else {
    }
    setBtnCriarAnimal(false);
  }

  return (
    <SafeAreaView style={stylesPadrao.background}>
      <Header title="Criar Animal" />
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
          <DescricaoInput text="Nome do animal:" icon={faCat} />
          <TextInput
            style={stylesPadrao.textInput}
            placeholder="Digite o nome aqui"
            autoCompleteType="off"
            autoCapitalize="words"
            maxLength={255}
            onChangeText={(nome) => {
              setNome(nome);
            }}
            onSubmitEditing={() => {
              inputDtNasc.current.focus();
            }}
            ref={inputNome}
          />
          <DescricaoInput text="Data de nascimento:" />
          <TextInput
            style={stylesPadrao.textInput}
            placeholder="dd/mm/aaaa"
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
                  "Deseja remover a foto?",
                  "A foto não será excluída do seu celular, apenas removida daqui!",
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
                source={{ uri: image }}
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
              setModalVisible(false);
              navigation.navigate("Camera");
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
    </SafeAreaView>
  );
}
