import type { ReactNode } from "react";
import {
  ImageBackground,
  type ImageBackgroundProps,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { styles } from "./styles";

type Props = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  resizeMode?: ImageBackgroundProps["resizeMode"];
};

export const BackgroundContainer = ({
  children,
  style,
  imageStyle,
  resizeMode = "cover",
}: Props) => (
  <ImageBackground
    source={require("../../../../assets/Background.png")}
    style={[styles.background, style]}
    imageStyle={imageStyle}
    resizeMode={resizeMode}
  >
    {children}
  </ImageBackground>
);
