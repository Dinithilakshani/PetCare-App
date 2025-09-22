import { View, Text, TextInput, TouchableOpacity, Alert, Switch, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import GradientView, { GradientPresets } from "@/components/GradientView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createTask, getTaskById, updateTask } from "@/services/taskService";
import { useLoader } from "@/context/LoaderContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { requestPermissionsIfNeeded, scheduleTaskReminder, cancelScheduledNotification } from "@/services/notificationService";

const TaskFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isNew = !id || id === "new";
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [notify, setNotify] = useState<boolean>(false);
  const [notificationId, setNotificationId] = useState<string | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
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
            if (task.dueDate) setDueDate(new Date(task.dueDate));
            if (typeof task.notify === 'boolean') setNotify(task.notify);
            if (task.notificationId) setNotificationId(task.notificationId);
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
      let newNotificationId: string | undefined = notificationId;

      // Notification scheduling logic
      if (notify && dueDate) {
        const granted = await requestPermissionsIfNeeded();
        if (!granted) {
          Alert.alert('Permission required', 'Enable notifications to receive reminders.');
        } else {
          // If updating, cancel previous schedule first
          if (!isNew && notificationId) {
            await cancelScheduledNotification(notificationId);
          }
          newNotificationId = await scheduleTaskReminder(
            `Reminder: ${title}`,
            description || 'Task is due',
            dueDate
          );
        }
      } else if (!notify && notificationId) {
        // If notifications turned off, cancel
        await cancelScheduledNotification(notificationId);
        newNotificationId = undefined;
      }

      const payload = {
        title,
        description,
        dueDate: dueDate ? dueDate.getTime() : undefined,
        notify,
        notificationId: newNotificationId,
      } as any;

      if (isNew) {
        await createTask(payload);
      } else {
        await updateTask(id, payload);
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
      <GradientView colors={GradientPresets.tealToEmerald} className="pb-6 pt-16 px-6 rounded-b-[40px] shadow-lg">
        <Text className="text-white text-3xl font-bold mb-2">
          {isNew ? "Add Task" : "Edit Task"}
        </Text>
        <Text className="text-emerald-100 text-lg">
          {isNew ? "Create a new task" : "Update your task details"}
        </Text>
      </GradientView>

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

          {/* Reminder Section */}
          <View className="mt-2">
            <Text className="text-gray-800 font-semibold text-lg mb-3">Reminder</Text>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-700 text-base">Enable Reminder</Text>
              <Switch value={notify} onValueChange={setNotify} />
            </View>
            {notify && (
              <View>
                <View className="flex-row justify-between mb-3">
                  <TouchableOpacity onPress={() => setShowDatePicker(true)} className="flex-1 bg-gray-100 rounded-xl py-3 mr-2 items-center border border-gray-200">
                    <Text className="text-gray-800 font-medium">{dueDate ? new Date(dueDate).toLocaleDateString() : 'Pick Date'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowTimePicker(true)} className="flex-1 bg-gray-100 rounded-xl py-3 ml-2 items-center border border-gray-200">
                    <Text className="text-gray-800 font-medium">{dueDate ? new Date(dueDate).toLocaleTimeString() : 'Pick Time'}</Text>
                  </TouchableOpacity>
                </View>
                {/* Pickers */}
                {showDatePicker && (
                  <DateTimePicker
                    value={dueDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={(e, selected) => {
                      setShowDatePicker(Platform.OS === 'ios');
                      if (selected) {
                        const base = dueDate || new Date();
                        const updated = new Date(base);
                        updated.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
                        setDueDate(updated);
                      }
                    }}
                  />
                )}
                {showTimePicker && (
                  <DateTimePicker
                    value={dueDate || new Date()}
                    mode="time"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(e, selected) => {
                      setShowTimePicker(Platform.OS === 'ios');
                      if (selected) {
                        const base = dueDate || new Date();
                        const updated = new Date(base);
                        updated.setHours(selected.getHours());
                        updated.setMinutes(selected.getMinutes());
                        updated.setSeconds(0);
                        updated.setMilliseconds(0);
                        setDueDate(updated);
                      }
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} className="active:scale-95">
          <GradientView colors={GradientPresets.tealToEmerald} className="rounded-2xl py-4 px-6 items-center shadow-lg">
            <Text className="text-white text-lg font-bold">
              {isNew ? "Add Task" : "Update Task"}
            </Text>
          </GradientView>
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