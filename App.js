import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert, ScrollView, View } from "react-native";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  /** FUNCTION */

  // filter list
  function getFilterList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        todoList.filter((todo) => !todo.isCompleted);
      case "inProgress":
        todoList.filter((todo) => todo.isCompleted);
    }
  }

  // add toDo
  function addTodo() {}

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

  // delete to do
  function deleteTodo(todoToDelete) {
    Alert.alert("Suppression", "Supprimer cette tâche?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  }

  // render to do list
  function renderTodoList() {
    return getFilterList().map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardTodo
          onLongPress={deleteTodo}
          onPress={updateTodo}
          todo={todo}
        ></CardTodo>
      </View>
    ));
  }

  function showAddDialog() {
    setIsAddDialogVisible(true);
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
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
          <ButtonAdd onPress={showAddDialog}></ButtonAdd>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        ></TabBottomMenu>
      </View>
      <Dialog.Container
        visible={isAddDialogVisible}
        onBackdropPress={() => setIsAddDialogVisible(false)}
      >
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Description>
          Choisi un nom pour la nouvelle tâche
        </Dialog.Description>
        <Dialog.Input onChangeText={setInputValue}></Dialog.Input>
        <Dialog.Button
          disabled={inputValue.trim().length === 0}
          label="Créer"
          onPress={addTodo}
        ></Dialog.Button>
      </Dialog.Container>
    </>
  );
}
