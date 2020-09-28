import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
} from "react-native";
import colors, { sizes } from "../../styles/colors";
import { getPixelSize } from "../../utils";

export default function BotoesHome(props) {
  return (
    // <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <FontAwesomeIcon
        style={{ alignSelf: "center" }}
        icon={props.icon ? props.icon : faPlus}
        size={props.sizeIcon ? props.sizeIcon : getPixelSize(8)}
        color={props.iconColor ? props.iconColor : colors.letraNormalClaro}
      />
      <Text style={styles.text}>{props.text}</Text>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    padding: 10,
    alignSelf: "center",
    alignContent: "center",
    color: colors.letraNormalClaro,
    // borderColor: colors.letraNormalClaro,
    // borderWidth: 1,
    minHeight: 100,
    minWidth: 150,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: sizes.letraPequena,
    color: colors.letraNormalClaro,
  },
  // safeArea: {
  //   position: "relative",
  //   flex: 1,
  //   flexDirection: "row",
  //   maxWidth: "95%",
  //   margin: 10,
  //   marginHorizontal: 15,
  //   padding: 40,
  //   borderColor: "#f00",
  //   borderWidth: 1,
  // },
});
