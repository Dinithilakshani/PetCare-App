import React from 'react';
import { View, ViewStyle, StyleSheet, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientViewProps extends ViewProps {
  colors: string[];
  children?: React.ReactNode;
  style?: ViewStyle;
  className?: string;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientViewBase: React.FC<GradientViewProps> = ({
  colors,
  children,
  style,
  className,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  ...rest
}) => {
  return (
    <View className={className} style={[{ overflow: 'hidden' }, style]} {...rest}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={StyleSheet.absoluteFillObject}
      />
      {children}
    </View>
  );
};

// Predefined gradient presets for common use cases
export const GradientPresets = {
  tealToEmerald: ['#0d9488', '#059669'], // from-teal-600 to-emerald-600
  blueToIndigo: ['#60a5fa', '#6366f1'], // from-blue-400 to-indigo-500
  purpleToPink: ['#a78bfa', '#ec4899'], // from-purple-400 to-pink-500
  grayToDark: ['#4b5563', '#1f2937'], // from-gray-600 to-gray-800
  cyanToBlue: ['#22d3ee', '#3b82f6'], // from-cyan-400 to-blue-500
  redToRed: ['#f87171', '#ef4444'], // from-red-400 to-red-500
  grayToGray: ['#9ca3af', '#6b7280'], // from-gray-400 to-gray-500
};

export default GradientViewBase;
