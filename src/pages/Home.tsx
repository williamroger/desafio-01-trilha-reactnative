import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const taskExists = tasks.find(task => task.title === newTaskTitle);
    if (taskExists) {
      const handleAlertOneOption = () => {
        Alert.alert(
          'Atenção',
          'Você não pode cadastrar uma task com o mesmo nome',
          [
            {
              text: 'Ok, entendi.',
              onPress: () => console.log('Ação cancelada pelo usuário.'),
              style: 'default',
            }
          ]
        )
      }

      handleAlertOneOption();
      return;
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, done: !task.done };

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const handleAlertTwoOptions = () => {
      Alert.alert(
        'Remover item',
        'Tem certeza que você deseja remover esse item?',
        [
          {
            text: 'Não',
            onPress: () => console.log('Ação cancelada pelo usuário.'),
            style: 'cancel'
          },
          {
            text: 'Sim',
            onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)),
            style: 'default',
          }
        ]
      )
    }

    handleAlertTwoOptions();
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})