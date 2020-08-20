import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import colors from "../../styles/colors";

export default function Loading(props) {
  return (
    <SafeAreaView style={styles.teste}>
      {/* <Text>Carregando...</Text> */}
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={colors.letraNormalClaro}
        animating={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    // backgroundColor: colors.darkblue,
    margin: "auto",
    marginVertical: "100%",
    marginHorizontal: "100%",
    alignSelf: "center",
    alignContent: "center",
  },
  view: {
    height: 50,
    width: 50,
  },
  teste: {
    position: "relative",
    width: 50,
    left: "50%",
    marginLeft: -25,
  },
});
