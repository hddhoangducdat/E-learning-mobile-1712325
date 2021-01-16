export const themeModify = (color: string, theme?: string): string => {
  if (theme === "Light") return color;
  else if (theme === "Dark") {
    let result: string;
    switch (color) {
      case "#fff":
        result = "#000";
        break;
      case "#000":
        result = "#fff";
        break;
      case "white":
        result = "black";
        break;
      case "#f0f3f5":
        result = "#292929";
        break;
      case "#3c4560":
        result = "#fff";
        break;
      case "#f0f3f5":
        result = "#050505";
        break;
      case "#fffefc":
        result = "#2d2d2d";
        break;
      case "#ffff":
        result = "#2d2d2d";
        break;
      case "#5d5d5d":
        result = "#fff";
        break;
      case "#3c4560":
        result = "#596791";
        break;
      case "#969696":
        result = "#fff";
        break;

      default:
        result = color;
        break;
    }
    return result;
  }
  return color;
};
