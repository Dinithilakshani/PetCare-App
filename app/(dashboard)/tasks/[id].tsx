import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createTask, getTaskById, updateTask } from "@/services/taskService";
import { useLoader } from "@/context/LoaderContext";

const TaskFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isNew = !id || id === "new";
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const { hideLoader, showLoader } = useLoader();

  useEffect(() => {
    const load = async () => {
      if (!isNew && id) {
        try {
          showLoader();
          const task = await getTaskById(id);
          if (task) {
            setTitle(task.title);
            setDescription(task.description);
          }
        } finally {
          hideLoader();
        }
      }
    };
    load();
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }
    try {
      showLoader();
      if (isNew) {
        await createTask({ title, description });
      } else {
        await updateTask(id, { title, description });
      }
      router.back();
    } catch (err) {
      console.error("Error saving task: ", err);
      Alert.alert("Error", "Failed to save task");
    } finally {
      hideLoader();
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 pb-6 pt-16 px-6 rounded-b-[40px] shadow-lg">
        <Text className="text-white text-3xl font-bold mb-2">
          {isNew ? "Add Task" : "Edit Task"}
        </Text>
        <Text className="text-emerald-100 text-lg">
          {isNew ? "Create a new task" : "Update your task details"}
        </Text>
      </View>

      {/* Form Content */}
      <View className="flex-1 px-6 pt-6">
        <View className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
          <Text className="text-gray-800 font-semibold text-lg mb-4">Task Details</Text>
          <View className="mb-4">
            <Text className="text-gray-600 text-sm font-medium mb-2">Title</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 text-base"
              placeholder="Enter task title"
              placeholderTextColor="#94a3b8"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View className="mb-4">
            <Text className="text-gray-600 text-sm font-medium mb-2">Description</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 text-base h-32"
              placeholder="Enter task description"
              placeholderTextColor="#94a3b8"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl py-4 px-6 items-center shadow-lg shadow-emerald-500/25 active:scale-95"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">
            {isNew ? "Add Task" : "Update Task"}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          className="bg-gray-100 rounded-2xl py-4 px-6 items-center mt-4 border border-gray-200"
          onPress={() => router.back()}
        >
          <Text className="text-gray-700 text-lg font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskFormScreen;