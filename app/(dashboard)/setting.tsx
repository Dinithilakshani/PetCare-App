import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation<any>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-[#FFF8E1] to-white">
      <View className="flex-1 px-6 pt-12">
        {/* Header Section */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-[#4DB6AC] mb-1">Settings 🐾</Text>
          <Text className="text-gray-500">Personalize your pet care experience</Text>
        </View>

        {/* Profile Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Profile</Text>
          <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-[#FFF8E1]">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                <Text className="text-[#4DB6AC] text-lg">😺</Text>
              </View>
              <View>
                <Text className="text-gray-800 font-semibold">Edit Profile</Text>
                <Text className="text-gray-500 text-sm">Update your info</Text>
              </View>
            </View>
            <Text className="text-[#4DB6AC] text-lg">›</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Preferences */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Notifications</Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-[#FFF8E1]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#4DB6AC] text-lg">🔔</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold">Push Notifications</Text>
                  <Text className="text-gray-500 text-sm">Reminders & updates</Text>
                </View>
              </View>
              <Switch
                value={isNotificationsEnabled}
                onValueChange={setIsNotificationsEnabled}
                trackColor={{ false: "#d1d5db", true: "#4DB6AC" }}
                thumbColor={isNotificationsEnabled ? "#FFF8E1" : "#f4f4f5"}
              />
            </View>
          </View>
        </View>

        {/* Appearance */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Appearance</Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-[#FFF8E1]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#FFD54F] text-lg">🌙</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold">Dark Mode</Text>
                  <Text className="text-gray-500 text-sm">Toggle app theme</Text>
                </View>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: "#d1d5db", true: "#4DB6AC" }}
                thumbColor={isDarkMode ? "#FFF8E1" : "#f4f4f5"}
              />
            </View>
          </View>
        </View>

        {/* Account Options */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Account</Text>
          <View className="space-y-4">
            <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-[#FFF8E1]">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#4DB6AC] text-lg">🔒</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold">Change Password</Text>
                  <Text className="text-gray-500 text-sm">Update your credentials</Text>
                </View>
              </View>
              <Text className="text-[#4DB6AC] text-lg">›</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-[#FFF8E1]">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#FFD54F] text-lg">🐶</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold">Pet Profiles</Text>
                  <Text className="text-gray-500 text-sm">Manage your pets</Text>
                </View>
              </View>
              <Text className="text-[#4DB6AC] text-lg">›</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gradient-to-r from-[#4DB6AC] to-[#4DB6AC]/80 rounded-2xl p-4 flex-row items-center justify-between shadow-sm">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#4DB6AC] text-lg">🚪</Text>
                </View>
                <View>
                  <Text className="text-white font-semibold">Log Out</Text>
                  <Text className="text-[#FFF8E1] text-sm">Sign out of your account</Text>
                </View>
              </View>
              <Text className="text-white text-lg">›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </View>
    </ScrollView>
  );
};

export default Settings;