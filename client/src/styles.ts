import { createStyles } from "@mui/styles";
import layout from "./jss/layout";
import margin from "./jss/margin";
import padding from "./jss/padding";
import typography from "./jss/typography";

const styles = createStyles({
  ...padding,
  ...margin,
  ...typography,
  ...layout,
});

export default styles;
