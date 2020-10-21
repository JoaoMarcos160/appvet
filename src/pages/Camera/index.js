import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBolt,
  faCircle,
  faSlash,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import colors, { stylesPadrao } from "../../styles/colors";
import { getPixelSize } from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { Easing } from "react-native-reanimated";

export default function PageCamera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [autoFocus] = useState(Camera.Constants.AutoFocus.on);
  const [ready, setReady] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const screenWidth = Dimensions.get("screen").width;
  const screenHeigth = Dimensions.get("window").height;
  const useNativeDriver = false;
  const [visibleModal, setVisibleModal] = useState(false);
  const [fotoTirada, setFotoTirada] = useState({ uri: null });
  const [flagRodarItem, setFlagRodarItem] = useState(true);

  //Animações
  const [rotacionarIconTypeCamera] = useState(new Animated.Value(0));

  //Referencias
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    //animação de rodar o icone quando troca de camera
    if (flagRodarItem) {
      Animated.timing(rotacionarIconTypeCamera, {
        toValue: 0,
        duration: 100,
        useNativeDriver: useNativeDriver,
        easing: Easing.bounce,
      }).start();
      setFlagRodarItem(false);
    } else {
      Animated.timing(rotacionarIconTypeCamera, {
        toValue: 180,
        duration: 100,
        useNativeDriver: useNativeDriver,
        easing: Easing.bounce,
      }).start();
      setFlagRodarItem(true);
    }
    console.log("Mudou o type da camera");
  }, [type]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={stylesPadrao.background}>
        <Text
          style={{
            ...stylesPadrao.text,
            marginVertical: (screenHeigth * 0.9) / 2,
          }}
        >
          Precisamos de acesso a câmera!
        </Text>
        <TouchableOpacity
          style={{ ...stylesPadrao.button, width: "70%" }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={stylesPadrao.textButton}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  async function tirarFoto() {
    let foto = await cameraRef.current.takePictureAsync();
    setFotoTirada(foto);
    console.log(foto);
    console.log("Foto tirada!");
    setVisibleModal(true);
  }

  function mudarFlashMode() {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.torch);
    } else if (flashMode === Camera.Constants.FlashMode.torch) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.backgroundPadrao} style="light" />
      <Camera
        whiteBalance="auto"
        style={{ flex: 1 }}
        type={type}
        autoFocus={autoFocus}
        ratio="1:1"
        flashMode={flashMode}
        onCameraReady={() => {
          setReady(true);
          console.log("Câmera pronta");
        }}
        onMountError={(message) => {
          setReady(false);
          console.warn(message);
        }}
        // onFacesDetected={(algumacoisa) => {
        //   console.log(algumacoisa);
        // }}
        ref={cameraRef}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: "flex-end",
              alignItems: "center",
              margin: 10,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Animated.View
              style={{
                transform: [{ rotate: rotacionarIconTypeCamera }],
              }}
            >
              <FontAwesomeIcon
                icon={faSyncAlt}
                color="#ffe"
                size={getPixelSize(7)}
              />
            </Animated.View>
          </TouchableOpacity>
          {ready && (
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
                margin: 10,
              }}
              onPress={() => {
                if (ready) {
                  tirarFoto();
                } else {
                  Alert.alert(
                    "Câmera não está pronta!",
                    "Aguarde alguns segundos e tente novamente!"
                  );
                }
              }}
            >
              <FontAwesomeIcon
                icon={faCircle}
                color="#ffe"
                size={getPixelSize(15)}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: "flex-end",
              alignItems: "center",
              margin: 10,
            }}
            onPress={() => {
              mudarFlashMode();
            }}
          >
            <View style={{ flexDirection: "column" }}>
              {flashMode === Camera.Constants.FlashMode.off && (
                <View style={styles.iconFlashMode}>
                  <FontAwesomeIcon
                    icon={faBolt}
                    color="#ffe"
                    size={getPixelSize(7)}
                    style={{ position: "absolute" }}
                  />
                  <FontAwesomeIcon
                    icon={faSlash}
                    color="#ffe"
                    size={getPixelSize(7)}
                  />
                </View>
              )}
              {flashMode === Camera.Constants.FlashMode.on && (
                <View style={styles.iconFlashMode}>
                  <FontAwesomeIcon
                    icon={faBolt}
                    color="#ffe"
                    size={getPixelSize(7)}
                  />
                  <Text
                    style={{
                      color: colors.letraNormalClaro,
                      fontWeight: "bold",
                      //   position: "absolute",
                    }}
                  >
                    A
                  </Text>
                </View>
              )}
              {flashMode === Camera.Constants.FlashMode.torch && (
                <FontAwesomeIcon
                  icon={faBolt}
                  color="#ffe"
                  size={getPixelSize(7)}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal animationType="slide" visible={visibleModal}>
        <SafeAreaView style={stylesPadrao.background}>
          <Text style={stylesPadrao.text}>Foto</Text>
          {fotoTirada.uri !== null ? (
            <Image
              style={{
                width: "94%",
                height: Dimensions.get("screen").width * 0.94,
                alignSelf: "center",
                borderColor: colors.letraNormalClaro,
                borderWidth: 1,
                borderRadius: 10,
              }}
              source={{ uri: fotoTirada.uri }}
            />
          ) : (
            <Text style={stylesPadrao.text}>Sem foto</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              setVisibleModal(false);
            }}
          >
            <Text style={stylesPadrao.text}>Tirar outra foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisibleModal(false);
              return true;
            }}
          >
            <Text style={stylesPadrao.text}>Usar essa foto</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconFlashMode: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});
