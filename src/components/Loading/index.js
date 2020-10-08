import React from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import colors from "../../styles/colors";

export default function Loading(props) {
  return (
    <SafeAreaView style={props.styleView ? props.styleView : styles.teste}>
      <ActivityIndicator
        style={props.style ? props.style : styles.loading}
        size={props.size ? props.size : "large"}
        color={props.color ? props.color : colors.letraNormalClaro}
        animating={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    margin: "auto",
    alignSelf: "center",
    alignContent: "center",
  },
  teste: {
    position: "relative",
    flex: 1,
    maxHeight: 50,
    maxWidth: "100%",
    margin: 30,
  },
});
