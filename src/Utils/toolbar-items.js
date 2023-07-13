export default [
  {
    icon: 23,
    items: [
      {
        type: "button",
        tooltip: "Bold",
        targetFormat: "bold",
        toggleable: true,
        icon: 4,
      },
      {
        type: "button",
        tooltip: "Italicize Text",
        targetFormat: "italic",
        toggleable: true,
        icon: 5,
      },
      {
        type: "button",
        tooltip: "Underline Text",
        targetFormat: "underline",
        toggleable: true,
        icon: 6,
        iconSize: 14,
      },
      {
        type: "divider",
      },
      {
        type: "value",
        tooltip: "Font Size",
        targetFormat: "size",
        default: 12,
        stepSize: 6,
        min: 6,
        max: 60,
      },
      {
        type: "divider",
      },
      {
        type: "modal",
        tooltip: "Font Family",
        targetFormat: "font",
        icon: 0,
      },
    ],
  },
  {
    icon: 7,
    items: [
      {
        type: "button",
        tooltip: "Align Text Left",
        targetFormat: "align",
        formatValue: false,
        icon: 7,
        iconSize: 14,
      },
      {
        type: "button",
        tooltip: "Align Text Center",
        targetFormat: "align",
        formatValue: "center",
        icon: 8,
        iconSize: 14,
      },
      {
        type: "button",
        tooltip: "Align Text Right",
        targetFormat: "align",
        formatValue: "right",
        icon: 9,
        iconSize: 14,
      },
      {
        type: "button",
        tooltip: "Justify Text",
        targetFormat: "align",
        formatValue: "justify",
        icon: 10,
        iconSize: 14,
      },
      {
        type: "divider",
      },
      {
        type: "modal",
        tooltip: "Line Height",
        icon: 11,
      },
    ],
  },
  {
    icon: 24,
    items: [
      {
        type: "color",
        tooltip: "Text Color",
        default: "rgba(0,0,0)",
        icon: 1,
      },
      {
        type: "color",
        tooltip: "Highlight Text",
        default: "rgba(255,255,0)",
        icon: 2,
      },
      {
        type: "divider",
      },
      {
        type: "color",
        tooltip: "Change Background Color",
        default: "rgb(255,255,240)",
        icon: 15,
      },
      {
        type: "image",
        tooltip: "Change Background Image",
        icon: 16,
      },
      {
        type: "divider",
      },
      {
        type: "image",
        tooltip: "Place Image",
        icon: 18,
      },
    ],
  },
  {
    icon: 22,
    items: [
      {
        type: "button",
        tooltip: "Toggle Rhyme Scheme",
        icon: 0,
        iconSize: 14,
      },
      {
        type: "button",
        tooltip: "Open Rhymes",
        icon: 12,
        iconSize: 14,
      },
      {
        type: "button",
        tooltip: "Open Dictionary",
        icon: 13,
        iconSize: 14,
      },
      {
        type: "divider",
      },
      {
        type: "button",
        tooltip: "Toggle Word Count",
        icon: 19,
        iconSize: 14,
      },
      {
        type: "button",
        tooltip: "Toggle Syllable View",
        icon: 14,
        iconSize: 15,
      },
    ],
  },
];
