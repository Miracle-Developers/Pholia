import { ImageSourcePropType } from "react-native";

export const getTreeImageSource = (leafCount: number): ImageSourcePropType => {
    if (leafCount < 1) {
        return require("@/../assets/tree(sick).png");
    }
    if (leafCount < 5) {
        return require("@/../assets/tree(normal).png");
    }
    return require("@/../assets/tree(fun).png");
};
