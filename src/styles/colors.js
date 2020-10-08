import { getPixelSize } from "../utils";

const colors = {
  primary: "#4169e1",
  rota: "#4169e1",
  botoes: "#35aaff",
  letraPesquisas: "#808080",
  letraNormal: "#000001",
  letraNormalClaro: "#fffffe",
  titulos: "#111",
  drawerColor: "#333",
  darkblue: "#00008b",
  corBoxes: "#0000ff",
  colorIcon: "#191919",
  colorInput: "#222",
  backgroundLogin: "#191919",
  backgroundPadrao: "#191919",
};

export const sizes = {
  iconDrawer: getPixelSize(8),
  borderNegocioDePuxarODrawer: getPixelSize(1),
  letraNormal: getPixelSize(7),
  letraGrande: getPixelSize(10),
  letraPequena: getPixelSize(6),
  letraMinuscula: getPixelSize(4),
  letraInputs: getPixelSize(6),
};

export const stylesPadrao = {
  container: {
    flex: 1,
    width: "100%",
    alignItems: "stretch",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.backgroundPadrao,
  },
  viewInput: {
    flexDirection: "column",
  },
  viewRowIcon: {
    flexDirection: "row",
  },
  icon: {
    textAlignVertical: "center",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 3,
    margin: 7,
    marginRight: 0,
    marginBottom: 7,
  },
  text: {
    margin: 10,
    marginBottom: 1,
    marginRight: 0,
    color: colors.letraNormalClaro,
    fontSize: sizes.letraPequena,
    textAlignVertical: "center",
  },
  textInput: {
    width: "auto",
    flex: 1,
    height: getPixelSize(15),
    margin: 7,
    marginTop: 2,
    fontSize: sizes.letraInputs,
    borderRadius: 4,
    padding: 8,
    borderColor: colors.letraNormalClaro,
    borderWidth: 1,
    color: colors.letraNormalClaro,
  },
  icon: {
    textAlignVertical: "center",
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 3,
    margin: 7,
    marginRight: 0,
    marginBottom: 7,
    // borderColor: "red",
    // borderWidth: 1,
  },
  button: {
    margin: 5,
    width: "auto",
    height: 40,
    borderColor: colors.titulos,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: colors.botoes,
  },
  textButton: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: colors.letraNormalClaro,
    fontSize: sizes.letraPequena,
  },
};

export default colors;
