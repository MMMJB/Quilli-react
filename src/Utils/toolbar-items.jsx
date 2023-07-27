import EditorToolbarButton from "../Pages/Editor/Components/ToolbarButton";
import EditorToolbarInput from "../Pages/Editor/Components/ToolbarInput";
import EditorToolbarColorInput from "../Pages/Editor/Components/ToolbarColorInput";
import EditorToolbarModal from "../Pages/Editor/Components/ToolbarModal";
import EditorToolbarImageInput from "../Pages/Editor/Components/ToolbarImageInput";
import PageColor from "../Pages/Editor/Components/PageColor";
import FontModal from "../Pages/Editor/Components/FontModal";

export default [
  {
    icon: 23,
    items: [
      {
        tooltip: "Bold",
        elm: (
          <EditorToolbarButton
            data={{ toggleable: true, icon: 4, targetFormat: "bold" }}
            key="bold"
            data-tooltip-id="bold"
            data-tooltip-content="Bold"
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Italicize Text",
        elm: (
          <EditorToolbarButton
            data={{ toggleable: true, icon: 5, targetFormat: "italic" }}
            key="italic"
            data-tooltip-id="italicizetext"
            data-tooltip-content="Italicize Text"
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Underline Text",
        elm: (
          <EditorToolbarButton
            data={{
              toggleable: true,
              icon: 6,
              iconSize: 14,
              targetFormat: "underline",
            }}
            key="underline"
            data-tooltip-id="underlinetext"
            data-tooltip-content="Underline Text"
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Font Size",
        elm: (
          <EditorToolbarInput
            data={{
              default: 12,
              stepSize: 6,
              min: 6,
              max: 60,
              targetFormat: "size",
            }}
            key="size"
            data-tooltip-id="fontsize"
            data-tooltip-content="Font Size"
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Font Family",
        elm: (
          <EditorToolbarModal
            data={{
              targetFormat: "font",
              icon: 0,
              children: <FontModal />,
            }}
            key="font"
            data-tooltip-id="fontfamily"
            data-tooltip-content="Font Family"
            data-tooltip-place="top"
          />
        ),
      },
    ],
  },
  {
    icon: 7,
    items: [
      {
        tooltip: "Align Text Left",
        elm: (
          <EditorToolbarButton
            data={{
              icon: 7,
              iconSize: 14,
              targetFormat: "align",
              formatValue: false,
            }}
            key="alignleft"
            data-tooltip-id="aligntextleft"
            data-tooltip-content="Align Text Left"
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Align Text Center",
        elm: (
          <EditorToolbarButton
            data={{
              icon: 8,
              iconSize: 14,
              targetFormat: "align",
              formatValue: "center",
            }}
            key="aligncenter"
            data-tooltip-id="aligntextcenter"
            data-tooltip-content="Align Text Center"
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Align Text Right",
        elm: (
          <EditorToolbarButton
            data={{
              icon: 9,
              iconSize: 14,
              targetFormat: "align",
              formatValue: "right",
            }}
            key="alignright"
            data-tooltip-id="aligntextright"
            data-tooltip-content="Align Text Right"
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Justify Text",
        elm: (
          <EditorToolbarButton
            data={{
              icon: 10,
              iconSize: 14,
              targetFormat: "align",
              formatValue: "justify",
            }}
            key="alignjustify"
            data-tooltip-id="justifytext"
            data-tooltip-content="Justify Text"
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Line Height",
        elm: (
          <EditorToolbarModal
            data={{ icon: 11 }}
            key="height"
            data-tooltip-id="lineheight"
            data-tooltip-content="Line Height"
            data-tooltip-place="top"
          />
        ),
      },
    ],
  },
  {
    icon: 24,
    items: [
      {
        tooltip: "Text Color",
        elm: (
          <EditorToolbarColorInput
            data={{ targetFormat: "color", default: "#000000", icon: 1 }}
            key="color"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Highlight Text",
        elm: (
          <EditorToolbarColorInput
            data={{
              targetFormat: "background",
              default: "#FFFF00",
              toggleable: true,
              icon: 2,
            }}
            key="highlight"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Change Background Color",
        elm: (
          <PageColor
            data={{ default: "#FFFFFD", icon: 15 }}
            key="pagecolor"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Change Background Image",
        elm: (
          <EditorToolbarImageInput
            data={{ icon: 16 }}
            key="backgroundimage"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Place Image",
        elm: (
          <EditorToolbarImageInput
            data={{ icon: 18 }}
            key="image"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
    ],
  },
  {
    icon: 22,
    items: [
      {
        tooltip: "Toggle Rhyme Scheme",
        elm: (
          <EditorToolbarButton
            data={{ icon: 0, iconSize: 14 }}
            key="scheme"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Open Rhymes",
        elm: (
          <EditorToolbarButton
            data={{ icon: 12, iconSize: 14 }}
            key="rhymes"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Open Dictionary",
        elm: (
          <EditorToolbarButton
            data={{ icon: 13, iconSize: 14 }}
            key="dictionary"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Toggle Word Count",
        elm: (
          <EditorToolbarButton
            data={{ icon: 19, iconSize: 14 }}
            key="count"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
      {
        tooltip: "Toggle Syllable View",
        elm: (
          <EditorToolbarButton
            data={{ icon: 14, iconSize: 15 }}
            key="syllables"
            data-tooltip-id=""
            data-tooltip-content=""
            data-tooltip-place="top"
          />
        ),
      },
    ],
  },
];
