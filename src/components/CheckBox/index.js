import React from "react";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getPixelSize } from "../../utils";
import colors from "../../styles/colors";

export default function CheckBox(props) {
  function handleChange() {
    const { onChange } = props;
    if (onChange) {
      return onChange();
    }
  }

  return (
    <View style={styles.WrapperCheckBox}>
      <TouchableOpacity
        onPress={handleChange}
        style={[
          styles.CheckBox,
          { borderColor: props.checkColor ? props.checkColor : "#fff" },
        ]}
      >
        {props.showIconInBox ? (
          <FontAwesomeIcon
            icon={props.icon ? props.icon : faCheck}
            size={props.sizeIcon ? props.sizeIcon : getPixelSize(10)}
            color={props.iconColor ? props.iconColor : colors.letraNormalClaro}
          />
        ) : null}
      </TouchableOpacity>
      <Text style={[styles.LabelCheck, props.labelStyle]}>{props.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  CheckBox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  WrapperCheckBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  LabelCheck: {
    color: "#fff",
    marginLeft: 6,
  },
});

// CheckBox.propTypes = {
//   label: PropTypes.string,
//   labelStyle: PropTypes.object,
//   iconColor: PropTypes.string,
//   onChange: PropTypes.func,
//   showIconInBox: PropTypes.bool,
//   checkColor: PropTypes.string,
//   icon: Icon,
//   sizeIcon: PropTypes.number,
//   iconColor: PropTypes.string,
// };
