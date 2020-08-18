import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import colors from "../../styles/colors";

export default function Loading() {
  return (
    <SafeAreaView style={styles.view}>
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
    position: "absolute",
    alignSelf: "center",
    alignContent: "center",
  },
  view: {
    height: 50,
    width: 50,
  },
});
