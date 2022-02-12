import { createStyles } from "@mui/styles";

const typography = createStyles({
  bold: {
    fontWeight: "bold",
  },
  textAlignLeft: {
    textAlign: "left",
  },
  clamp3: {
    textOverflow: "ellipsis",
    lineClamp: 4,
    display: "-webkit-box",
    boxOrient: "vertical",
    overflow: "hidden",
  },
  textBlack: {
    color: "black",
  },
  textWhite: {
    color: "white",
  },
  delete: {
    color: "#e61d1d",
    fontWeight: 420,
  },
});

export default typography;
