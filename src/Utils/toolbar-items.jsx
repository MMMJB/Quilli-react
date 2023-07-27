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
          />
        ),
      },
      {
        tooltip: "Italic",
        elm: (
          <EditorToolbarButton
            data={{ toggleable: true, icon: 5, targetFormat: "italic" }}
            key="italic"
            data-tooltip-id="italic"
            data-tooltip-content="Italic"
          />
        ),
      },
      {
        tooltip: "Underline",
        elm: (
          <EditorToolbarButton
            data={{
              toggleable: true,
              icon: 6,
              iconSize: 14,
              targetFormat: "underline",
            }}
            key="underline"
            data-tooltip-id="underline"
            data-tooltip-content="Underline"
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
          />
        ),
      },
      {
        tooltip: "Font",
        elm: (
          <EditorToolbarModal
            data={{
              targetFormat: "font",
              icon: 0,
              children: <FontModal />,
            }}
            key="font"
            data-tooltip-id="font"
            data-tooltip-content="Font"
          />
        ),
      },
    ],
  },
  {
    icon: 7,
    items: [
      {
        tooltip: "Align Left",
        elm: (
          <EditorToolbarButton
            data={{
              icon: 7,
              iconSize: 14,
              targetFormat: "align",
              formatValue: false,
            }}
            key="alignleft"
            data-tooltip-id="alignleft"
            data-tooltip-content="Align Left"
          />
        ),
      },
      {
        tooltip: "Align Center",
        elm: (
          <EditorToolbarButton
            data={{
              icon: 8,
              iconSize: 14,
              targetFormat: "align",
              formatValue: "center",
            }}
            key="aligncenter"
            data-tooltip-id="aligncenter"
            data-tooltip-content="Align Center"
          />
        ),
      },
      {
        tooltip: "Align Right",
        elm: (
          <EditorToolbarButton
            data={{
              icon: 9,
              iconSize: 14,
              targetFormat: "align",
              formatValue: "right",
            }}
            key="alignright"
            data-tooltip-id="alignright"
            data-tooltip-content="Align Right"
          />
        ),
      },
      {
        tooltip: "Justify",
        elm: (
          <EditorToolbarButton
            data={{
              icon: 10,
              iconSize: 14,
              targetFormat: "align",
              formatValue: "justify",
            }}
            key="alignjustify"
            data-tooltip-id="justify"
            data-tooltip-content="Justify"
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
            data-tooltip-id="textcolor"
            data-tooltip-content="Text Color"
          />
        ),
      },
      {
        tooltip: "Highlight",
        elm: (
          <EditorToolbarColorInput
            data={{
              targetFormat: "background",
              default: "#FFFF00",
              toggleable: true,
              icon: 2,
            }}
            key="highlight"
            data-tooltip-id="highlight"
            data-tooltip-content="Highlight"
          />
        ),
      },
      {
        tooltip: "Page Color",
        elm: (
          <PageColor
            data={{ default: "#FFFFFD", icon: 15 }}
            key="pagecolor"
            data-tooltip-id="pagecolor"
            data-tooltip-content="Page Color"
          />
        ),
      },
      {
        tooltip: "Background Image",
        elm: (
          <EditorToolbarImageInput
            data={{ icon: 16 }}
            key="backgroundimage"
            data-tooltip-id="backgroundimage"
            data-tooltip-content="Background Image"
          />
        ),
      },
      {
        tooltip: "Image",
        elm: (
          <EditorToolbarImageInput
            data={{ icon: 18 }}
            key="image"
            data-tooltip-id="image"
            data-tooltip-content="Image"
          />
        ),
      },
    ],
  },
  {
    icon: 22,
    items: [
      {
        tooltip: "Rhyme Scheme",
        elm: (
          <EditorToolbarButton
            data={{ icon: 0, iconSize: 14 }}
            key="scheme"
            data-tooltip-id="rhymescheme"
            data-tooltip-content="Rhyme Scheme"
          />
        ),
      },
      {
        tooltip: "Rhymes",
        elm: (
          <EditorToolbarButton
            data={{ icon: 12, iconSize: 14 }}
            key="rhymes"
            data-tooltip-id="rhymes"
            data-tooltip-content="Rhymes"
          />
        ),
      },
      {
        tooltip: "Dictionary",
        elm: (
          <EditorToolbarButton
            data={{ icon: 13, iconSize: 14 }}
            key="dictionary"
            data-tooltip-id="dictionary"
            data-tooltip-content="Dictionary"
          />
        ),
      },
      {
        tooltip: "Word Count",
        elm: (
          <EditorToolbarButton
            data={{ icon: 19, iconSize: 14 }}
            key="count"
            data-tooltip-id="wordcount"
            data-tooltip-content="Word Count"
          />
        ),
      },
      {
        tooltip: "Syllable View",
        elm: (
          <EditorToolbarButton
            data={{ icon: 14, iconSize: 15 }}
            key="syllables"
            data-tooltip-id="syllableview"
            data-tooltip-content="Syllable View"
          />
        ),
      },
    ],
  },
];
