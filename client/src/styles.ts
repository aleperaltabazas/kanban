import { createStyles } from "@mui/styles";
import margin from "./jss/margin";
import padding from "./jss/padding";
import typography from "./jss/typography";

const styles = createStyles({
  ...padding,
  ...margin,
  ...typography,
});

export default styles;
