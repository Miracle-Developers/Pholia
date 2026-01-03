import { Image, type ImageProps, type ImageStyle, type StyleProp } from "react-native";

type Props = {
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageProps["resizeMode"];
};

export const Logo = ({ style, resizeMode = "contain" }: Props) => (
  <Image source={require("../../../assets/Logo.png")} style={style} resizeMode={resizeMode} />
);
