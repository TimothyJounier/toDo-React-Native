import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Sortir le chien", isCompleted: true },
    { id: 2, title: "Faire un bisou à crapautin", isCompleted: false },
    { id: 3, title: "Faire les courses", isCompleted: false },
    { id: 4, title: "Appeler le vétérinaire", isCompleted: true },
    { id: 5, title: "Faire les courses", isCompleted: false },
    { id: 6, title: "Appeler le vétérinaire", isCompleted: true },
    { id: 7, title: "Faire les courses", isCompleted: false },
    { id: 8, title: "Appeler le vétérinaire", isCompleted: true },
  ]);

  /** FUNCTION */

  // update the toDo
  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updatedTodo.id
    );
    const updatedTodoList = [...todoList];
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }

  // render to do list
  function renderTodoList() {
    return todoList.map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardTodo onPress={updateTodo} todo={todo}></CardTodo>
      </View>
    ));
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header></Header>
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        ></TabBottomMenu>
      </View>
    </>
  );
}
