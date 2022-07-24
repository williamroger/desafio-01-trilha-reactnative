import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import cancelIcon from '../assets/icons/cancel/cancel.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskEdit {
  taskId: number;
  taskNewTitle: string;
}

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (task: TaskEdit) => void;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({
      taskId: task.id,
      taskNewTitle: taskTitle,
    });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        //TODO - use onPress (toggle task) prop
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          //TODO - use style prop 
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            //TODO - use style prop
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerButtons}>
        {isEditing ? (
          <TouchableOpacity
            testID={`cancel-${index}`}
            onPress={handleCancelEditing}
          >
            <Image source={cancelIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`edit-${index}`}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.buttonSeparator} />
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(task.id)}
          style={{ paddingRight: 24 }}
          disabled={isEditing}
        //TODO - use onPress (remove task) prop
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonSeparator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 14,
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
});