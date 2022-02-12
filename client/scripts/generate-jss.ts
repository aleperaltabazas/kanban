const fs = require("fs");

const size = 15;
const sides = [
  { abbrev: "l", side: "Left" },
  { abbrev: "r", side: "Right" },
  { abbrev: "b", side: "Bottom" },
  { abbrev: "t", side: "Top" },
];

type Style = {
  className: string;
  style: {
    key: string;
    value: string;
  };
};

const toStyleString = (s: Style) =>
  `${s.className}: { ${s.style.key}: "${s.style.value}" }`;

function generate(property: string) {
  const styles = [1, 2, 3, 4, 5]
    .flatMap((p) =>
      sides.map((s) => {
        const className = `${property.charAt(0)}${s.abbrev}${p}`;
        const key = `${property}${s.side}`;

        return {
          className: className,
          style: {
            key: key,
            value: `${p * size}px`,
          },
        } as Style;
      })
    )
    .map(toStyleString)
    .join(",\n  ");

  return `
import { createStyles } from "@mui/styles";

const ${property} = createStyles({
  ${styles.toString()}
});

export default ${property};
    `.trim();
}

const paddings = generate("padding");
const margins = generate("margin");

fs.writeFileSync("src/jss/margin.ts", margins);
fs.writeFileSync("src/jss/padding.ts", paddings);
