interface ColorShade {
  main: string;
  contrastText: string;
}

interface BackgroundColors {
  default: string;
  paper: string;
}

interface TextColors {
  primary: string;
  secondary: string;
}

interface AccentColors {
  blue: string;
  red: string;
  green: string;
  yellow: string;
}

interface HoverColors {
  primary: string;
  accentBlue: string;
}

interface ColorSet {
  primary: ColorShade;
  secondary: ColorShade;
  background: BackgroundColors;
  text: TextColors;
  border: string;
  accent: AccentColors;
  hover: HoverColors;
  activeBgColor: string;
}

interface ColorsType {
  light: ColorSet;
  dark: ColorSet;
}




export const Colors: ColorsType = {
  light: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#666666',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    border: '#e0e0e0',
    accent: {
      blue: '#007bff',
      red: '#ff4d4f',
      green: '#52c41a',
      yellow: '#faad14',
    },
    hover: {
      primary: '#1a1a1a',
      accentBlue: '#0056b3',
    },
    activeBgColor : "#FFCC91"
  },
  dark: {
    primary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    secondary: {
      main: '#bbbbbb',
      contrastText: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
    border: '#333333',
    accent: {
      blue: '#339aff',
      red: '#ff7875',
      green: '#73d13d',
      yellow: '#fadb14',
    },
    hover: {
      primary: '#2a2a2a',
      accentBlue: '#1d78c1',
    },
    activeBgColor : "#FFCC91"
  },
};

