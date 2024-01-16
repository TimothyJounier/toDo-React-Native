import { s } from "./Header.style";
import { Image, Text } from "react-native";
import headerLogo from "../../assets/logo.png";

export function Header(){
    return <>
    <Image style={s.img} source={headerLogo} resizeMode="contain"></Image>
    <Text style={s.subtitle}>Tu as probablement un truc à faire</Text>
    </>
} 