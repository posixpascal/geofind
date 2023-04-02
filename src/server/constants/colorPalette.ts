export const COLORS = [
  "perano",
  "putty",
  "malibu",
  "granny-smith-apple",
  "wild-rice",
  "yellow-green",
  "fog",
];

export const TAILWIND_TEXT_COLORS = [
  "text-perano-400",
  "text-putty-400",
  "text-malibu-400",
  "text-granny-smith-apple-400",
  "text-wild-rice-400",
  "text-yellow-green-400",
  "text-fog-400",
];

export type ColorPaletteKey = "main" | "brown"  | "asphalt" | "mint" | "yellow" | "darkorange" | "purple" | "pink" | "pine";
export interface ColorPalette {
  headline: string;
  paragraph: string;
  background: string;
  main: string;
  button: string;
  action: string;
  tertiary: string;
  secondary: string;
}

export const COLOR_PALETTES : Record<ColorPaletteKey, ColorPalette> = {
  'main': {
    headline: "#001858",
    paragraph: "#172c66",
    background: "#fef6e4",
    main: "#f3d2c1",
    button: "#f582ae",
    action: "#001858",
    tertiary: "#f582ae",
    secondary: "#8bd3dd"
  },
  'brown': {
    headline: "#fffffe",
    paragraph: "#fff3ec",
    background: "#55423d",
    main: "#fff3ec",
    button: "#ffc0ad",
    action: "#271c19",
    secondary: "#ffc0ad",
    tertiary: "#9656a1",
  },
  'mint': {
    headline: "#33272a",
    paragraph: "#594a4e",
    background: "#faeee7",
    main: "#fffffe",
    button: "#ff8ba7",
    action: "#33272a",
    tertiary: "#c3f0ca",
    secondary: "#ffc6c7",
  },
  'yellow': {
    headline: "#272343",
    paragraph: "#2d334a",
    background: "#bae8e8",
    main: "#fffffe",
    button: "#ffd803",
    action: "#272343",
    tertiary: "#fff",
    secondary: "#e3f6f5",
  },
  'darkorange': {
    headline: "#fffffe",
    paragraph: "#a7a9be",
    background: "#0f0e17",
    main: "#fffffe",
    button: "#ff8906",
    action: "#fffffe",
    tertiary: "#e53170",
    secondary: "#f25f4c",
  },
  'purple': {
    headline: "#fffffe",
    paragraph: "#b8c1ec",
    background: "#232946",
    main: "#b8c1ec",
    button: "#eebbc3",
    action: "#232946",
    tertiary: "#eebbc3",
    secondary: "#fffffe",
  },
  'pine': {
    headline: "#fffffe",
    paragraph: "#abd1c6",
    background: "#004643",
    main: "#e8e4e6",
    button: "#f9bc60",
    action: "#001e1d",
    tertiary: "#e16162",
    secondary: "#abd1c6",
  },
  'asphalt': {
    headline: "#0d0d0d",
    paragraph: "#2a2a2a",
    background: "#eff0f3",
    main: "#eff0f3",
    button: "#ff8e3c",
    action: "#0d0d0d",
    tertiary: "#d9376e",
    secondary: "#fffffe",
  },
  'pink': {
    headline: "#fffffe",
    paragraph: "#94a1b2",
    background: "#242629",
    main: "#f9f8fc",
    button: "#0e172c",
    action: "#7f5af0",
    tertiary: "#2cb67d",
    secondary: "#72757e",
  }
}