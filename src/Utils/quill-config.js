import Quill from "quill";

import fonts from "./fonts";

export default function initializeQuill() {
  const Font = Quill.import("formats/font");
  Font.whitelist = Array.from(fonts, (f) =>
    f.toLowerCase().replaceAll(" ", "-"),
  );
  Quill.register(Font, true);

  const customStyles = document.createElement("style");
  document.head.appendChild(customStyles);
  const sheet = customStyles.sheet;

  Font.whitelist.forEach((f) => {
    sheet.insertRule(`.ql-font-${f} {font-family:var(--${f})}`, 0);
  });

  ["center", "right", "justify"].forEach((a) => {
    sheet.insertRule(`.ql-align-${a} {text-align: ${a}}`);
  });

  const Size = Quill.import("attributors/style/size");
  Size.whitelist = Array.from({ length: 11 }, (_, i) => `${i * 6}px`).slice(1);
  Quill.register(Size, true);
}
