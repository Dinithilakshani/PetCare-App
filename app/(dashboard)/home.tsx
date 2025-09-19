import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { useNavigation } from '@react-navigation/native';

const homescreen = () => {
  const navigation = useNavigation<any>();
  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-[#FFF8E1] to-white">
      <View className="flex-1 px-6 pt-12">
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-2xl font-bold text-[#4DB6AC] mb-1">Hello Dinu! 👋</Text>
            <Text className="text-gray-500">How's your furry friend today?</Text>
          </View>
          <TouchableOpacity className="w-12 h-12 bg-[#FFF8E1] rounded-full items-center justify-center">
            <Text className="text-[#4DB6AC] text-xl">🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="mb-8">
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#FFF8E1]">
            <Text className="text-[#4DB6AC] text-lg mr-3">🔍</Text>
            <TextInput
              placeholder="Search for services, tips, or vets..."
              placeholderTextColor="#d1d5db"
              className="flex-1 text-gray-700"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-white rounded-2xl p-4 items-center shadow-sm border border-[#FFF8E1] flex-1 mr-2">
              <Text className="text-3xl mb-2">🏥</Text>
              <Text className="text-[#4DB6AC] font-semibold text-center">Book Vet</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-2xl p-4 items-center shadow-sm border border-[#FFF8E1] flex-1 mx-1">
              <Text className="text-3xl mb-2">💊</Text>
              <Text className="text-[#4DB6AC] font-semibold text-center">Medicine</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-2xl p-4 items-center shadow-sm border border-[#FFF8E1] flex-1 ml-2">
              <Text className="text-3xl mb-2">🎾</Text>
              <Text className="text-[#4DB6AC] font-semibold text-center">Play Time</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pet Status Card */}
        <View className="bg-gradient-to-r from-[#4DB6AC] to-[#4DB6AC]/80 rounded-3xl p-6 mb-8 shadow-md">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white font-bold text-lg mb-2">Your Pet's Health</Text>
              <Text className="text-[#FFF8E1] mb-4">Everything looks great! 🐕</Text>
              <TouchableOpacity className="bg-white rounded-xl px-4 py-2 self-start">
                <Text className="text-[#4DB6AC] font-bold">View Details</Text>
              </TouchableOpacity>
            </View>
            <View className="w-16 h-16 bg-[#FFD54F] rounded-full items-center justify-center">
              <Text className="text-white text-2xl">❤️</Text>
            </View>
          </View>
        </View>

        {/* Navigation Links */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Menu</Text>
          <View className="space-y-4">
            {/* Bathing */}
            <TouchableOpacity
              onPress={() => navigation.navigate('bathing')}
              className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-[#FFF8E1] my-2"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#4DB6AC] text-lg">🚿</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold text-base">Bathing</Text>
                  <Text className="text-gray-500 text-sm">Pet grooming & bathing</Text>
                </View>
              </View>
              <Text className="text-[#4DB6AC] text-lg">›</Text>
            </TouchableOpacity>
            {/* Food */}
            <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-[#FFF8E1]">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#4DB6AC] text-lg">🍲</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold">Food</Text>
                  <Text className="text-gray-500 text-sm">Nutrition & meals</Text>
                </View>
              </View>
              <Text className="text-[#4DB6AC] text-lg">›</Text>
            </TouchableOpacity>
            {/* Medical Details */}
            <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-[#FFF8E1]">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#4DB6AC] text-lg">🏥</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold">Medical Details</Text>
                  <Text className="text-gray-500 text-sm">Common health info</Text>
                </View>
              </View>
              <Text className="text-[#4DB6AC] text-lg">›</Text>
            </TouchableOpacity>
            {/* Animals (Gallery) */}
            <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-[#FFF8E1]">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#FFF8E1] rounded-full items-center justify-center mr-3">
                  <Text className="text-[#FFD54F] text-lg">🐾</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-semibold">Animals</Text>
                  <Text className="text-gray-500 text-sm">Images & breeds</Text>
                </View>
              </View>
              <Text className="text-[#4DB6AC] text-lg">›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activities */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activities</Text>
          <View className="space-y-3">
            <View className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm border border-[#FFF8E1]">
              <View className="w-3 h-3 bg-[#4DB6AC] rounded-full mr-3" />
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">Vaccination completed</Text>
                <Text className="text-gray-500 text-sm">2 hours ago</Text>
              </View>
            </View>
            <View className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm border border-[#FFF8E1]">
              <View className="w-3 h-3 bg-[#FFD54F] rounded-full mr-3" />
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">Feeding reminder</Text>
                <Text className="text-gray-500 text-sm">4 hours ago</Text>
              </View>
            </View>
            <View className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm border border-[#FFF8E1]">
              <View className="w-3 h-3 bg-[#4DB6AC] rounded-full mr-3" />
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">Playtime session</Text>
                <Text className="text-gray-500 text-sm">Yesterday</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </View>
    </ScrollView>
  );
};

export default homescreen;