// components/icons/CustomIcon.tsx
import React from "react";
import { Image, View } from "react-native";
import {
  Defs,
  LinearGradient,
  Stop,
  Svg,
  Text as SvgText,
} from "react-native-svg";

type Props = {
  src: any;
  iconHeight?: number;
  iconWidth?: number;
  focused?: boolean;
  title: string;
  fontSize?: number;
  fontBorder?: number;
  lineHeight?: number; // dodatkowy odstęp między liniami
};

export function CustomIcon({
  src,
  iconHeight = 24,
  iconWidth = 24,
  focused = false,
  title,
  fontBorder = 2,
  fontSize = 10,
  lineHeight = 1.2, // multiplikator do fontSize
}: Props) {
  // Rozdzielamy tytuł po spacjach na słowa
  const lines = title.split(" ");

  // Liczymy wysokość SVG na podstawie liczby linii
  const svgHeight = lines.length * fontSize * lineHeight + 2 * fontBorder;
  const svgWidth = Math.max(
    fontSize * 4,
    lines.reduce(
      (acc, line) => Math.max(acc, line.length * fontSize * 0.6),
      0,
    ) +
      2 * fontBorder,
  ); // opcjonalnie dynamiczna szerokość

  return (
    <View
      style={{
        width: 72,
        height: 80,
        backgroundColor: focused ? "#3aaf03" : "#a2cf1b",
        borderRadius: 70,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      <Image source={src} style={{ width: iconWidth, height: iconHeight }} />
      <Svg height={svgHeight} width={svgWidth}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="yellow" />
            <Stop offset="100%" stopColor="orange" />
          </LinearGradient>
        </Defs>

        {/* Opcjonalne tło SVG dla debugu */}
        <SvgText x={0} y={0} fill="transparent" stroke="none">
          {/* tylko do debugu */}
        </SvgText>

        {lines.map((line, index) => {
          // Y dla każdej linii
          const y = fontBorder + fontSize / 2 + index * fontSize * lineHeight;

          return (
            <React.Fragment key={index}>
              {/* Obramowanie */}
              <SvgText
                x={svgWidth / 2}
                y={y}
                fill="none"
                stroke="black"
                strokeWidth={2}
                fontSize={fontSize}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {line}
              </SvgText>

              {/* Gradient */}
              <SvgText
                x={svgWidth / 2}
                y={y}
                fill="url(#grad)"
                fontSize={fontSize}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {line}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}
