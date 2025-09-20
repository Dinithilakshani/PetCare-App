import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { useNavigation } from '@react-navigation/native';

const homescreen = () => {
  const navigation = useNavigation<any>();
  
  return (
    <View className="flex-1 bg-slate-50">
      {/* Header with Curved Background */}
      <View className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 pb-8 pt-16 px-6 rounded-b-[40px] shadow-lg">
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold mb-2">
              Hello Dinu! 
              <Text className="text-yellow-300"> 👋</Text>
            </Text>
            <Text className="text-emerald-100 text-lg">
              Your furry friend is waiting for you
            </Text>
          </View>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center border border-white/30">
              <Text className="text-white text-xl">🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center border border-white/30">
              <Text className="text-white text-xl">👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-white/90 backdrop-blur-lg rounded-2xl px-5 py-4 flex-row items-center shadow-sm border border-white/50">
          <View className="w-8 h-8 bg-emerald-100 rounded-full items-center justify-center mr-3">
            <Text className="text-emerald-600 text-lg">🔍</Text>
          </View>
          <TextInput
            placeholder="Search services, tips, or find a vet..."
            placeholderTextColor="#94a3b8"
            className="flex-1 text-gray-800 text-base font-medium"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Pet Status Card - Floating */}
        <View className="-mt-6 mb-8 z-10">
          <View className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl items-center justify-center mr-4 shadow-lg">
                <Text className="text-white text-3xl">🐕</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-bold text-xl mb-1">Max is Healthy!</Text>
                <Text className="text-gray-500 text-base mb-3">Last checkup: 3 days ago</Text>
                <View className="flex-row items-center">
                  <View className="flex-1 bg-emerald-100 rounded-full h-2 mr-3">
                    <View className="bg-emerald-500 h-2 rounded-full w-4/5" />
                  </View>
                  <Text className="text-emerald-600 text-sm font-semibold">85% Health</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity className="w-[48%] bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 items-center shadow-sm border border-blue-200 mb-4">
              <View className="w-16 h-16 bg-blue-500 rounded-2xl items-center justify-center mb-4 shadow-md">
                <Text className="text-white text-3xl">🏥</Text>
              </View>
              <Text className="text-blue-700 font-bold text-lg text-center">Book Vet</Text>
              <Text className="text-blue-500 text-sm text-center mt-1">Schedule appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 items-center shadow-sm border border-purple-200 mb-4">
              <View className="w-16 h-16 bg-purple-500 rounded-2xl items-center justify-center mb-4 shadow-md">
                <Text className="text-white text-3xl">💊</Text>
              </View>
              <Text className="text-purple-700 font-bold text-lg text-center">Medicine</Text>
              <Text className="text-purple-500 text-sm text-center mt-1">Health & meds</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6 items-center shadow-sm border border-orange-200 mb-4">
              <View className="w-16 h-16 bg-orange-500 rounded-2xl items-center justify-center mb-4 shadow-md">
                <Text className="text-white text-3xl">🎾</Text>
              </View>
              <Text className="text-orange-700 font-bold text-lg text-center">Play Time</Text>
              <Text className="text-orange-500 text-sm text-center mt-1">Fun activities</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-6 items-center shadow-sm border border-pink-200 mb-4">
              <View className="w-16 h-16 bg-pink-500 rounded-2xl items-center justify-center mb-4 shadow-md">
                <Text className="text-white text-3xl">📊</Text>
              </View>
              <Text className="text-pink-700 font-bold text-lg text-center">Analytics</Text>
              <Text className="text-pink-500 text-sm text-center mt-1">Health insights</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Menu */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-gray-800">Pet Care Services</Text>
            <TouchableOpacity>
              <Text className="text-emerald-600 font-semibold text-base">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {/* Bathing */}
            <TouchableOpacity
              onPress={() => navigation.navigate('bathing')}
              className="bg-white rounded-3xl p-5 flex-row items-center shadow-sm border border-gray-100"
              activeOpacity={0.7}
            >
              <View className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl items-center justify-center mr-4 shadow-md">
                <Text className="text-white text-2xl">🚿</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-bold text-lg mb-1">Professional Bathing</Text>
                <Text className="text-gray-500 text-base">Grooming & spa treatments</Text>
              </View>
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-emerald-600 text-lg font-bold">›</Text>
              </View>
            </TouchableOpacity>

            {/* Food */}
            <TouchableOpacity className="bg-white rounded-3xl p-5 flex-row items-center shadow-sm border border-gray-100">
              <View className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl items-center justify-center mr-4 shadow-md">
                <Text className="text-white text-2xl">🍲</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-bold text-lg mb-1">Nutrition Plan</Text>
                <Text className="text-gray-500 text-base">Healthy meals & diet tips</Text>
              </View>
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-emerald-600 text-lg font-bold">›</Text>
              </View>
            </TouchableOpacity>

            {/* Medical */}
            <TouchableOpacity className="bg-white rounded-3xl p-5 flex-row items-center shadow-sm border border-gray-100">
              <View className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl items-center justify-center mr-4 shadow-md">
                <Text className="text-white text-2xl">🏥</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-bold text-lg mb-1">Medical Records</Text>
                <Text className="text-gray-500 text-base">Health history & checkups</Text>
              </View>
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-emerald-600 text-lg font-bold">›</Text>
              </View>
            </TouchableOpacity>

            {/* Gallery */}
            <TouchableOpacity className="bg-white rounded-3xl p-5 flex-row items-center shadow-sm border border-gray-100">
              <View className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl items-center justify-center mr-4 shadow-md">
                <Text className="text-white text-2xl">🐾</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-bold text-lg mb-1">Pet Gallery</Text>
                <Text className="text-gray-500 text-base">Photos & breed information</Text>
              </View>
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-emerald-600 text-lg font-bold">›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activities Timeline */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-6">Recent Activities</Text>
          <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <View className="space-y-5">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-emerald-500 rounded-full items-center justify-center mr-4 shadow-sm">
                  <Text className="text-white text-lg">✓</Text>
                </View>
                <View className="flex-1 pb-5 border-b border-gray-100">
                  <Text className="text-gray-800 font-bold text-lg mb-1">Vaccination Completed</Text>
                  <Text className="text-gray-500 text-base">Annual vaccines administered successfully</Text>
                  <Text className="text-emerald-600 text-sm font-medium mt-2">2 hours ago</Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-yellow-500 rounded-full items-center justify-center mr-4 shadow-sm">
                  <Text className="text-white text-lg">🍽️</Text>
                </View>
                <View className="flex-1 pb-5 border-b border-gray-100">
                  <Text className="text-gray-800 font-bold text-lg mb-1">Feeding Time</Text>
                  <Text className="text-gray-500 text-base">Morning meal completed - Premium kibble</Text>
                  <Text className="text-yellow-600 text-sm font-medium mt-2">4 hours ago</Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-4 shadow-sm">
                  <Text className="text-white text-lg">🎾</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-bold text-lg mb-1">Playtime Session</Text>
                  <Text className="text-gray-500 text-base">30 minutes of fetch at the park</Text>
                  <Text className="text-blue-600 text-sm font-medium mt-2">Yesterday</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
};

export default homescreen;