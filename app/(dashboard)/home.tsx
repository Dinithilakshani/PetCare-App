import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import React from "react";
import GradientView, { GradientPresets } from "../../components/GradientView";

const homescreen = () => {
  const router = useRouter();
  
  return (
    <View className="flex-1 bg-gray-100">
      {/* Header with Curved Background */}
      <GradientView colors={GradientPresets.tealToEmerald} className="pb-8 pt-16 px-6 rounded-b-[40px]" style={styles.headerShadow}>
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold mb-2">
              Hello Dinu! 
              <Text className="text-yellow-300"> 👋</Text>
            </Text>
            <Text className="text-teal-100 text-lg">
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
        <View className="bg-white rounded-2xl px-5 py-4 flex-row items-center border border-gray-200" style={styles.searchBarShadow}>
          <View className="w-8 h-8 bg-teal-100 rounded-full items-center justify-center mr-3">
            <Text className="text-teal-600 text-lg">🔍</Text>
          </View>
          <TextInput
            placeholder="Search services, tips, or find a vet..."
            placeholderTextColor="#6b7280"
            className="flex-1 text-gray-900 text-base font-medium"
          />
        </View>
      </GradientView>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Pet Status Card - Floating */}
        <View className="-mt-6 mb-8 z-10">
          <View className="bg-white rounded-3xl p-6 border border-gray-200" style={styles.petCardShadow}>
            <View className="flex-row items-center">
              <GradientView colors={GradientPresets.tealToEmerald} className="w-16 h-16 rounded-2xl items-center justify-center mr-4" style={styles.iconShadow}>
                <Text className="text-white text-3xl">🐕</Text>
              </GradientView>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-xl mb-1">Max is Healthy!</Text>
                <Text className="text-gray-600 text-base mb-3">Last checkup: 3 days ago</Text>
                <View className="flex-row items-center">
                  <View className="flex-1 bg-teal-100 rounded-full h-2 mr-3">
                    <View className="bg-teal-600 h-2 rounded-full w-4/5" />
                  </View>
                  <Text className="text-teal-600 text-sm font-semibold">85% Health</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity className="w-[48%] bg-teal-50 rounded-3xl p-6 items-center  border border-teal-100 mb-4">
              <GradientView colors={GradientPresets.tealToEmerald} className="w-16 h-16 rounded-2xl items-center justify-center mb-4 ">
                <Text className="text-white text-3xl">🏥</Text>
              </GradientView>
              <Text className="text-teal-700 font-bold text-lg text-center">Book Vet</Text>
              <Text className="text-teal-600 text-sm text-center mt-1">Schedule appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-teal-50 rounded-3xl p-6 items-center  border border-teal-100 mb-4">
              <GradientView colors={GradientPresets.tealToEmerald} className="w-16 h-16 rounded-2xl items-center justify-center mb-4 ">
                <Text className="text-white text-3xl">💊</Text>
              </GradientView>
              <Text className="text-teal-700 font-bold text-lg text-center">Medicine</Text>
              <Text className="text-teal-600 text-sm text-center mt-1">Health & meds</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-teal-50 rounded-3xl p-6 items-center  border border-teal-100 mb-4">
              <GradientView colors={GradientPresets.tealToEmerald} className="w-16 h-16 rounded-2xl items-center justify-center mb-4 ">
                <Text className="text-white text-3xl">🎾</Text>
              </GradientView>
              <Text className="text-teal-700 font-bold text-lg text-center">Play Time</Text>
              <Text className="text-teal-600 text-sm text-center mt-1">Fun activities</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-teal-50 rounded-3xl p-6 items-center  border border-teal-100 mb-4">
              <GradientView colors={GradientPresets.tealToEmerald} className="w-16 h-16 rounded-2xl items-center justify-center mb-4 ">
                <Text className="text-white text-3xl">📊</Text>
              </GradientView>
              <Text className="text-teal-700 font-bold text-lg text-center">Analytics</Text>
              <Text className="text-teal-600 text-sm text-center mt-1">Health insights</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Menu */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-gray-900">Pet Care Services</Text>
            <TouchableOpacity>
              <Text className="text-teal-600 font-semibold text-base">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {/* Bathing */}
            <TouchableOpacity
              onPress={() => router.push('/bathing')}
              className="bg-white rounded-3xl p-5 flex-row items-center  border border-gray-200"
              activeOpacity={0.7}
            >
              <GradientView colors={GradientPresets.tealToEmerald} className="w-14 h-14 rounded-2xl items-center justify-center mr-4 ">
                <Text className="text-white text-2xl">🚿</Text>
              </GradientView>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-lg mb-1">Professional Bathing</Text>
                <Text className="text-gray-600 text-base">Grooming & spa treatments</Text>
              </View>
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-teal-600 text-lg font-bold">›</Text>
              </View>
            </TouchableOpacity>

            {/* Food */}
            <TouchableOpacity
              onPress={() => router.push('/food')}
              className="bg-white rounded-3xl p-5 flex-row items-center  border border-gray-200"
            >
              <GradientView colors={GradientPresets.tealToEmerald} className="w-14 h-14 rounded-2xl items-center justify-center mr-4 ">
                <Text className="text-white text-2xl">🍲</Text>
              </GradientView>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-lg mb-1">Nutrition Plan</Text>
                <Text className="text-gray-600 text-base">Healthy meals & diet tips</Text>
              </View>
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-teal-600 text-lg font-bold">›</Text>
              </View>
            </TouchableOpacity>

            {/* Medical */}
            <TouchableOpacity
              onPress={() => router.push('/medical')}
              className="bg-white rounded-3xl p-5 flex-row items-center  border border-gray-200"
            >
              <GradientView colors={GradientPresets.tealToEmerald} className="w-14 h-14 rounded-2xl items-center justify-center mr-4 ">
                <Text className="text-white text-2xl">🏥</Text>
              </GradientView>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-lg mb-1">Medical Records</Text>
                <Text className="text-gray-600 text-base">Health history & checkups</Text>
              </View>
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-teal-600 text-lg font-bold">›</Text>
              </View>
            </TouchableOpacity>

            {/* Gallery */}
            <TouchableOpacity className="bg-white rounded-3xl p-5 flex-row items-center  border border-gray-200">
              <GradientView colors={GradientPresets.tealToEmerald} className="w-14 h-14 rounded-2xl items-center justify-center mr-4 ">
                <Text className="text-white text-2xl">🐾</Text>
              </GradientView>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-lg mb-1">Pet Gallery</Text>
                <Text className="text-gray-600 text-base">Photos & breed information</Text>
              </View>
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-teal-600 text-lg font-bold">›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activities Timeline */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</Text>
          <View className="bg-white rounded-3xl p-6  border border-gray-200">
            <View className="space-y-5">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-teal-600 rounded-full items-center justify-center mr-4 ">
                  <Text className="text-white text-lg">✓</Text>
                </View>
                <View className="flex-1 pb-5 border-b border-gray-200">
                  <Text className="text-gray-900 font-bold text-lg mb-1">Vaccination Completed</Text>
                  <Text className="text-gray-600 text-base">Annual vaccines administered successfully</Text>
                  <Text className="text-teal-600 text-sm font-medium mt-2">2 hours ago</Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-orange-400 rounded-full items-center justify-center mr-4 ">
                  <Text className="text-white text-lg">🍽️</Text>
                </View>
                <View className="flex-1 pb-5 border-b border-gray-200">
                  <Text className="text-gray-900 font-bold text-lg mb-1">Feeding Time</Text>
                  <Text className="text-gray-600 text-base">Morning meal completed - Premium kibble</Text>
                  <Text className="text-orange-400 text-sm font-medium mt-2">4 hours ago</Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-blue-400 rounded-full items-center justify-center mr-4 ">
                  <Text className="text-white text-lg">🎾</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-bold text-lg mb-1">Playtime Session</Text>
                  <Text className="text-gray-600 text-base">30 minutes of fetch at the park</Text>
                  <Text className="text-blue-400 text-sm font-medium mt-2">Yesterday</Text>
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

const styles = StyleSheet.create({
  headerShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  searchBarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  petCardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 15,
  },
  iconShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  actionCardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIconShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  serviceCardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceIconShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  activityCardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIconShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default homescreen;