import tinycolor from "tinycolor2";

export const isTooDark = (hexString: string) =>
  tinycolor(hexString).getBrightness() < 128;
