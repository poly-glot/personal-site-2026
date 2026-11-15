interface Palette {
  attribute: string;
  attributeValue: string;
  comment: string;
  field: string;
  foreground: string;
  function: string;
  interpolation: string;
  keyword: string;
  number: string;
  regex: string;
  string: string;
  tag: string;
}

const KEYWORD_SCOPES = [
  "keyword",
  "storage.type",
  "storage.modifier",
  "variable.language",
  "constant.language",
];

const FUNCTION_SCOPES = [
  "entity.name.function",
  "support.function",
  "meta.function-call entity.name.function",
];

const FIELD_SCOPES = [
  "variable.other.property",
  "variable.other.object.property",
  "meta.object-literal.key",
  "support.variable.property",
];

function theme(
  name: string,
  type: "light" | "dark",
  palette: Palette,
) {
  return {
    colors: { "editor.foreground": palette.foreground },
    name,
    tokenColors: [
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { fontStyle: "italic", foreground: palette.comment },
      },
      { scope: KEYWORD_SCOPES, settings: { foreground: palette.keyword } },
      {
        scope: ["keyword.operator", "storage.type.function.arrow"],
        settings: { foreground: palette.foreground },
      },
      {
        scope: ["keyword.operator.new", "keyword.operator.expression"],
        settings: { foreground: palette.keyword },
      },
      {
        scope: ["string", "punctuation.definition.string"],
        settings: { foreground: palette.string },
      },
      {
        scope: [
          "punctuation.definition.template-expression",
          "punctuation.section.embedded",
        ],
        settings: { foreground: palette.interpolation },
      },
      {
        scope: ["constant.numeric"],
        settings: { foreground: palette.number },
      },
      { scope: ["string.regexp"], settings: { foreground: palette.regex } },
      { scope: FUNCTION_SCOPES, settings: { foreground: palette.function } },
      { scope: FIELD_SCOPES, settings: { foreground: palette.field } },
      {
        scope: [
          "entity.name.tag",
          "support.class.component",
          "punctuation.definition.tag",
        ],
        settings: { foreground: palette.tag },
      },
      {
        scope: ["entity.other.attribute-name"],
        settings: { foreground: palette.attribute },
      },
      {
        scope: ["meta.tag.attributes string"],
        settings: { foreground: palette.attributeValue },
      },
    ],
    type,
  };
}

export const ideaLight = theme("idea-light", "light", {
  attribute: "#174AD4",
  attributeValue: "#067D17",
  comment: "#8C8C8C",
  field: "#871094",
  foreground: "#080808",
  function: "#00627A",
  interpolation: "#0037A6",
  keyword: "#0033B3",
  number: "#1750EB",
  regex: "#264EFF",
  string: "#067D17",
  tag: "#0033B3",
});

export const ideaDark = theme("idea-dark", "dark", {
  attribute: "#BABABA",
  attributeValue: "#A5C261",
  comment: "#808080",
  field: "#9876AA",
  foreground: "#A9B7C6",
  function: "#FFC66D",
  interpolation: "#CC7832",
  keyword: "#CC7832",
  number: "#6897BB",
  regex: "#64A0D0",
  string: "#6A8759",
  tag: "#E8BF6A",
});
