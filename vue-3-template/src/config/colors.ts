type ColorShade = {
  DEFAULT: string;
  hover: string;
  active: string;
  bg: string;
  text: string;
};

type ColorVariant = {
  light: ColorShade;
  dark: ColorShade;
};

type ColorScheme = {
  primary: ColorVariant;
  secondary: ColorVariant;
  success: ColorVariant;
  danger: ColorVariant;
  warning: ColorVariant;
  info: ColorVariant;
};

export const colors: ColorScheme = {
  primary: {
    light: {
      DEFAULT: '#1fa9a7', // indigo-700
      hover: '#1fa9a7',   // indigo-800
      active: '#312E81',  // indigo-900
      bg: '#EEF2FF',      // indigo-50
      text: '#4338CA',    // indigo-700
    },
    dark: {
      DEFAULT: '#1fa9a7', // indigo-500
      hover: '#1fa9a7',   // indigo-400
      active: '#A5B4FC',  // indigo-300
      bg: '#1E293B',      // slate-800
      text: '#E0E7FF',    // indigo-100
    }
  },
  secondary: {
    light: {
      DEFAULT: '#4B5563', // gray-600
      hover: '#1fa9a7',   // gray-700
      active: '#1F2937',  // gray-800
      bg: '#F3F4F6',      // gray-100
      text: '#4B5563',    // gray-600
    },
    dark: {
      DEFAULT: '#9CA3AF', // gray-400
      hover: '#D1D5DB',   // gray-300
      active: '#E5E7EB',  // gray-200
      bg: '#1F2937',      // gray-800
      text: '#F3F4F6',    // gray-100
    }
  },
  success: {
    light: {
      DEFAULT: '#16A34A', // green-600
      hover: '#15803D',   // green-700
      active: '#166534',  // green-800
      bg: '#F0FDF4',      // green-50
      text: '#16A34A',    // green-600
    },
    dark: {
      DEFAULT: '#22C55E', // green-500
      hover: '#4ADE80',   // green-400
      active: '#86EFAC',  // green-300
      bg: '#166534',      // green-900
      text: '#DCFCE7',    // green-100
    }
  },
  danger: {
    light: {
      DEFAULT: '#DC2626', // red-600
      hover: '#B91C1C',   // red-700
      active: '#991B1B',  // red-800
      bg: '#FEF2F2',      // red-50
      text: '#DC2626',    // red-600
    },
    dark: {
      DEFAULT: '#EF4444', // red-500
      hover: '#F87171',   // red-400
      active: '#FCA5A5',  // red-300
      bg: '#7F1D1D',      // red-900
      text: '#FEE2E2',    // red-100
    }
  },
  warning: {
    light: {
      DEFAULT: '#CA8A04', // yellow-600
      hover: '#A16207',   // yellow-700
      active: '#854D0E',  // yellow-800
      bg: '#FEFCE8',      // yellow-50
      text: '#CA8A04',    // yellow-600
    },
    dark: {
      DEFAULT: '#EAB308', // yellow-500
      hover: '#FACC15',   // yellow-400
      active: '#FDE047',  // yellow-300
      bg: '#713F12',      // yellow-900
      text: '#FEF9C3',    // yellow-100
    }
  },
  info: {
    light: {
      DEFAULT: '#2563EB', // blue-600
      hover: '#1D4ED8',   // blue-700
      active: '#1E40AF',  // blue-800
      bg: '#EFF6FF',      // blue-50
      text: '#2563EB',    // blue-600
    },
    dark: {
      DEFAULT: '#3B82F6', // blue-500
      hover: '#60A5FA',   // blue-400
      active: '#93C5FD',  // blue-300
      bg: '#1E3A8A',      // blue-900
      text: '#DBEAFE',    // blue-100
    }
  }
};

// Helper function to convert hex to RGB values
export function hexToRgb(hex: string): [number, number, number] {
  // Remove the hash if it exists
  const cleanHex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return [r, g, b];
}

// Helper function to convert RGB values to CSS variable format
export function rgbToCssVar(r: number, g: number, b: number): string {
  return `${r} ${g} ${b}`;
}

// Generate CSS variables for the color scheme
export function generateColorVariables(): Record<string, string> {
  const variables: Record<string, string> = {};
  
  Object.entries(colors).forEach(([colorName, variants]) => {
    Object.entries(variants).forEach(([variant, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        const [r, g, b] = hexToRgb(value);
        variables[`--color-${colorName}-${variant}-${shade}`] = rgbToCssVar(r, g, b);
      });
    });
  });

  return variables;
} 