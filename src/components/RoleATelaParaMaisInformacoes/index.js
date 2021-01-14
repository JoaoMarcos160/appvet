import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View } from "react-native";
import colors from "../../styles/colors";

const RoleATelaParaMaisInformacoes = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ color: colors.letraNormalClaro, margin: 5, opacity: 0.8 }}>
        Role a tela para mais informações
      </Text>
      <FontAwesomeIcon
        icon={faArrowCircleDown}
        color={colors.letraNormalClaro}
      />
    </View>
  );
};

export default RoleATelaParaMaisInformacoes;
