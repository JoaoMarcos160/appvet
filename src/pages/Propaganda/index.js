import React from "react";
import { View, Text, Dimensions } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import colors, { stylesPadrao } from "../../styles/colors";
import { mostrarPropaganda, mostrarPropagandaComRecompensa } from "../../utils";

export default function Propaganda() {
  const larguraBotao = Dimensions.get("screen").width * 0.94;
  const alturaDaTela = Dimensions.get("screen").height;
  return (
    <SafeAreaView
      style={{
        ...stylesPadrao.background,
        paddingVertical: (alturaDaTela - 180) / 2,
      }}
    >
      <TouchableOpacity
        style={{
          ...stylesPadrao.button,
          alignSelf: "center",
          width: larguraBotao,
        }}
        onPress={() => {
          mostrarPropaganda();
        }}
      >
        <Text style={stylesPadrao.textButton}>Ver um banner de propaganda</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...stylesPadrao.button,
          alignSelf: "center",
          height: 60,
          width: larguraBotao,
        }}
        onPress={() => {
          mostrarPropagandaComRecompensa();
        }}
      >
        <Text style={stylesPadrao.textButton}>
          Ver um banner de propaganda com recompensa
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
