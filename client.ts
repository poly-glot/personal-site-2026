import "./styles/main.css";

const styleModules = {
  ...import.meta.glob("./components/**/*.css", { eager: true }),
  ...import.meta.glob("./routes/**/*.module.css", { eager: true }),
};

export const loadedStyleModuleCount = Object.keys(styleModules).length;
