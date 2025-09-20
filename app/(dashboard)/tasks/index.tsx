import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllTaskData, taskColRef } from "@/services/taskService";
import { useRouter, useSegments } from "expo-router";
import { Task } from "@/types/task";
import { useLoader } from "@/context/LoaderContext";
import { onSnapshot } from "firebase/firestore";

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

  const handleDelete = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          console.log("Deleting task:", taskId);
          // Add delete task logic here
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
    return "📋"; // Customize based on task type or category
  };

  const getPriorityColor = (priority: string = "medium") => {
    switch (priority.toLowerCase()) {
      case "high":
        return "from-red-400 to-red-500";
      case "medium":
        return "from-yellow-400 to-orange-500";
      case "low":
        return "from-green-400 to-emerald-500";
      default:
        return "from-blue-400 to-indigo-500";
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 pb-6 pt-16 px-6 rounded-b-[40px] shadow-lg">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold mb-2">Pet Record</Text>
            <Text className="text-emerald-100 text-lg">
              {tasks.length} tasks • {filteredTasks.filter((t) => t.completed).length} completed
            </Text>
          </View>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center border border-white/30">
              <Text className="text-white text-xl">🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center border border-white/30">
              <Text className="text-white text-xl">⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-white/90 backdrop-blur-lg rounded-2xl px-5 py-4 flex-row items-center shadow-sm border border-white/50">
          <View className="w-8 h-8 bg-emerald-100 rounded-full items-center justify-center mr-3">
            <Text className="text-emerald-600 text-lg">🔍</Text>
          </View>
          <TextInput
            placeholder="Search tasks..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-gray-800 text-base font-medium"
          />
        </View>
      </View>

      {/* Tasks List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {filteredTasks.length === 0 ? (
          <View className="bg-white rounded-3xl p-8 items-center shadow-sm border border-gray-100 mt-8">
            <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
              <Text className="text-4xl">📝</Text>
            </View>
            <Text className="text-gray-800 font-bold text-xl mb-2">No Records Found</Text>
            <Text className="text-gray-500 text-center text-base">
              {searchQuery ? "Try adjusting your search" : "Create your first task to get started"}
            </Text>
          </View>
        ) : (
          <View className="space-y-4">
            {filteredTasks.map((task) => (
              <View
                key={task.id}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                {/* Task Header */}
                <View className="flex-row items-start justify-between mb-4">
                  <View className="flex-row items-start flex-1">
                    <View
                      className={`w-12 h-12 bg-gradient-to-br ${getPriorityColor(
                        task.priority
                      )} rounded-2xl items-center justify-center mr-4 shadow-md`}
                    >
                      <Text className="text-white text-xl">{getTaskIcon(task)}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 font-bold text-lg mb-1 leading-tight">
                        {task.title}
                      </Text>
                      <Text className="text-gray-500 text-base mb-3 leading-relaxed">
                        {task.description}
                      </Text>
                      {/* Task Meta Info */}
                      <View className="flex-row items-center flex-wrap">
                        {task.priority && (
                          <View
                            className={`px-3 py-1 rounded-full mr-2 mb-2 bg-gradient-to-r ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            <Text className="text-white text-xs font-bold uppercase tracking-wide">
                              {task.priority}
                            </Text>
                          </View>
                        )}
                        {task.dueDate && (
                          <View className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
                            <Text className="text-gray-600 text-xs font-medium">
                              📅 {new Date(task.dueDate).toLocaleDateString()}
                            </Text>
                          </View>
                        )}
                        {task.completed && (
                          <View className="bg-green-100 px-3 py-1 rounded-full mr-2 mb-2">
                            <Text className="text-green-600 text-xs font-bold">
                              ✅ COMPLETED
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row space-x-3 mt-4 pt-4 border-t border-gray-100">
                  <TouchableOpacity
                    onPress={() => router.push(`/(dashboard)/tasks/${task.id}`)}
                    className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl py-3 flex-row items-center justify-center"
                  >
                    <Text className="text-blue-600 text-lg mr-2">✏️</Text>
                    <Text className="text-blue-700 font-bold">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(task.id)}
                    className="flex-1 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl py-3 flex-row items-center justify-center"
                  >
                    <Text className="text-red-600 text-lg mr-2">🗑️</Text>
                    <Text className="text-red-700 font-bold">Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="w-12 h-12 bg-gray-50 border-2 border-gray-200 rounded-2xl items-center justify-center">
                    <Text className="text-gray-600 text-lg">⋯</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-8 right-6">
        <TouchableOpacity
          onPress={() => router.push("/(dashboard)/tasks/new")}
          className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl items-center justify-center shadow-2xl shadow-emerald-500/25 active:scale-95"
        >
          <Text className="text-white text-3xl font-light">+</Text>
        </TouchableOpacity>
        {/* FAB Label */}
        <View className="absolute -left-24 top-1/2 -translate-y-1/2 bg-gray-800 px-1 py-2 rounded-xl">
          <Text className="text-white text-sm font-medium">Add  Recoard</Text>
        </View>
      </View>
    </View>
  );
};

export default TasksScreen;