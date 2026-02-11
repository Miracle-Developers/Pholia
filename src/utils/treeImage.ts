import { ImageSourcePropType } from "react-native";

export const getTreeImageSource = (leafCount: number): ImageSourcePropType => {
    if (leafCount < 5) {
        return require("@/../assets/tree(sick).png");
    }
    if (leafCount < 20) {
        return require("@/../assets/tree(normal).png");
    }
    return require("@/../assets/tree(fun).png");
};
