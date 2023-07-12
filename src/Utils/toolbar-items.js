export default [
  {
    icon: 23,
    items: [
      {
        type: "button",
        tooltip: "Bold",
        icon: 4,
      },
      {
        type: "button",
        tooltip: "Italicize Text",
        icon: 5,
      },
      {
        type: "button",
        tooltip: "Underline Text",
        icon: 6,
        size: 14,
      },
      {
        type: "divider",
      },
      {
        type: "value",
        tooltip: "Font Size",
        default: 12,
      },
      {
        type: "divider",
      },
      {
        type: "modal",
        tooltip: "Font Family",
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
        icon: 7,
        size: 14,
      },
      {
        type: "button",
        tooltip: "Align Text Center",
        icon: 8,
        size: 14,
      },
      {
        type: "button",
        tooltip: "Align Text Right",
        icon: 9,
        size: 14,
      },
      {
        type: "button",
        tooltip: "Justify Text",
        icon: 10,
        size: 14,
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
        default: "rgb(255,255,0)",
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
        size: 14,
      },
      {
        type: "button",
        tooltip: "Open Rhymes",
        icon: 12,
        size: 14,
      },
      {
        type: "button",
        tooltip: "Open Dictionary",
        icon: 13,
        size: 14,
      },
      {
        type: "divider",
      },
      {
        type: "button",
        tooltip: "Toggle Word Count",
        icon: 19,
        size: 14,
      },
      {
        type: "button",
        tooltip: "Toggle Syllable View",
        icon: 14,
        size: 15,
      },
    ],
  },
];
