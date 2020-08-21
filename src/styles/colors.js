import { getPixelSize } from "../utils";

const colors = {
  primary: "#4169e1",
  rota: "#4169e1",
  botoes: "#4169e1",
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
  letraInputs: getPixelSize(6),
};

export default colors;
