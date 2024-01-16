import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { s } from "./App.style";

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}></View>
          <View style={s.body}></View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}></View>
    </>
  );
}
