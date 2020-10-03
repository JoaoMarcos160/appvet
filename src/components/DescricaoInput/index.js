import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text } from "react-native";
import colors, { stylesPadrao } from "../../styles/colors";

export default function DescricaoInput(props) {
  return (
    <View style={stylesPadrao.viewRowIcon}>
      {props.icon && (
        <FontAwesomeIcon
          style={stylesPadrao.icon}
          icon={props.icon}
          color={colors.letraNormalClaro}
        />
      )}
      <Text style={stylesPadrao.text}>{props.text}</Text>
    </View>
  );
}
