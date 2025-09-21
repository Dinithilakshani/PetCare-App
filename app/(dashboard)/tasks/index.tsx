import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllTaskData, taskColRef } from "@/services/taskService";
import { useRouter } from "expo-router";
import { Task } from "@/types/task";
import { useLoader } from "@/context/LoaderContext";
import { onSnapshot, deleteDoc, doc } from "firebase/firestore";

const TasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const { hideLoader, showLoader } = useLoader();

  useEffect(() => {
    showLoader();
    const unsubscribe = onSnapshot(
      taskColRef,
      (snapshot) => {
        const taskList = snapshot.docs.map((taskRef) => ({
          id: taskRef.id,
          ...taskRef.data(),
        })) as Task[];
        setTasks(taskList);
        hideLoader();
      },
      (err) => {
        console.error(err);
        hideLoader();
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDelete = async (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            showLoader();
            const taskRef = doc(taskColRef, taskId);
            await deleteDoc(taskRef);
            Alert.alert("Success", "Task deleted successfully!");
          } catch (error) {
            console.error("Error deleting task:", error);
            Alert.alert("Error", "Failed to delete task. Please try again.");
          } finally {
            hideLoader();
          }
        },
      },
    ]);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTaskIcon = (task: Task) => {
    return "🐾"; // Changed to paw icon for pet care theme
  };

  const getPriorityColor = (priority: string = "medium") => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-400";
      case "low":
        return "bg-green-400";
      default:
        return "bg-blue-400";
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-gradient-to-r from-teal-600 to-emerald-600 pt-12 pb-6 px-5 rounded-b-3xl shadow-md">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white text-4xl font-extrabold tracking-tight">
              Pet Records
            </Text>
            <Text className="text-teal-100 text-base font-medium mt-1">
              {tasks.length} tasks • {filteredTasks.filter((t) => t.completed).length} completed
            </Text>
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity className="w-10 h-10 bg-teal-700/50 rounded-full items-center justify-center active:scale-90 transition-transform">
              <Text className="text-white text-lg">🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-teal-700/50 rounded-full items-center justify-center active:scale-90 transition-transform">
              <Text className="text-white text-lg">⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-white/95 rounded-xl px-4 py-3 flex-row items-center shadow-sm border border-teal-100">
          <Text className="text-teal-600 text-lg mr-3">🔍</Text>
          <TextInput
            placeholder="Search tasks"
            placeholderTextColor="#6b7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-gray-900 text-base font-medium"
          />
        </View>
      </View>

      {/* Task List */}
      <ScrollView className="flex-1 px-5 mt-4" showsVerticalScrollIndicator={false}>
        {filteredTasks.length === 0 ? (
          <View className="bg-white rounded-2xl p-6 mt-6 items-center shadow-sm border border-gray-200">
            <View className="w-16 h-16 bg-teal-100 rounded-full items-center justify-center mb-4">
              <Text className="text-3xl">🐾</Text>
            </View>
            <Text className="text-gray-800 font-semibold text-lg mb-2">
              No Records Found
            </Text>
            <Text className="text-gray-600 text-sm text-center">
              {searchQuery ? "Try a different search term" : "Add a new task to get started"}
            </Text>
          </View>
        ) : (
          <View className="space-y-3 mb-20">
            {filteredTasks.map((task) => (
              <View
                key={task.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`w-10 h-10 ${getPriorityColor(
                        task.priority
                      )} rounded-lg items-center justify-center mr-4`}
                    >
                      <Text className="text-white text-lg">{getTaskIcon(task)}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-900 font-semibold text-lg mb-1">
                        {task.title}
                      </Text>
                      <Text
                        className="text-gray-600 text-sm"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {task.description}
                      </Text>
                      <View className="flex-row items-center mt-2 space-x-2">
                        {task.priority && (
                          <View
                            className={`px-2 py-1 rounded-md ${getPriorityColor(
                              task.priority
                            )} bg-opacity-20`}
                          >
                            <Text className="text-xs font-bold uppercase text-gray-800">
                              {task.priority}
                            </Text>
                          </View>
                        )}
                        {task.dueDate && (
                          <View className="px-2 py-1 rounded-md bg-gray-100">
                            <Text className="text-xs font-medium text-gray-600">
                              📅 {new Date(task.dueDate).toLocaleDateString()}
                            </Text>
                          </View>
                        )}
                        {task.completed && (
                          <View className="px-2 py-1 rounded-md bg-green-100">
                            <Text className="text-xs font-bold text-green-700">✅ Done</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row space-x-2 mt-4 pt-3 border-t border-gray-200">
                  <TouchableOpacity
                    onPress={() => router.push(`/(dashboard)/tasks/${task.id}`)}
                    className="flex-1 bg-teal-50 rounded-lg py-2 items-center justify-center active:scale-95 transition-transform"
                  >
                    <Text className="text-teal-700 font-semibold">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(task.id)}
                    className="flex-1 bg-red-50 rounded-lg py-2 items-center justify-center active:scale-95 transition-transform"
                  >
                    <Text className="text-red-700 font-semibold">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-6 right-5">
        <TouchableOpacity
          onPress={() => router.push("/(dashboard)/tasks/new")}
          className="w-14 h-14 bg-teal-600 rounded-full items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <Text className="text-white text-2xl font-bold">+</Text>
        </TouchableOpacity>
        <View className="absolute -left-20 top-1/2 -translate-y-1/2 bg-teal-800 px-3 py-1 rounded-lg">
          <Text className="text-white text-xs font-medium">Add Record</Text>
        </View>
      </View>
    </View>
  );
};

export default TasksScreen;