import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';

const SettingsPage = () => {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") }
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightElement, showArrow = true }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm border border-gray-100 mb-3"
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl items-center justify-center mr-4 shadow-md">
        <Text className="text-white text-xl">{icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-800 font-bold text-lg mb-1">{title}</Text>
        {subtitle && <Text className="text-gray-500 text-sm">{subtitle}</Text>}
      </View>
      {rightElement || (showArrow && (
        <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
          <Text className="text-emerald-600 text-lg font-bold">›</Text>
        </View>
      ))}
    </TouchableOpacity>
  );

  const SwitchItem = ({ icon, title, subtitle, value, onValueChange, iconBg = "from-emerald-400 to-teal-500" }) => (
    <View className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm border border-gray-100 mb-3">
      <View className={`w-12 h-12 bg-gradient-to-br ${iconBg} rounded-xl items-center justify-center mr-4 shadow-md`}>
        <Text className="text-white text-xl">{icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-800 font-bold text-lg mb-1">{title}</Text>
        {subtitle && <Text className="text-gray-500 text-sm">{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#e5e7eb", true: "#10b981" }}
        thumbColor={value ? "#ffffff" : "#9ca3af"}
        ios_backgroundColor="#e5e7eb"
      />
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 pb-6 pt-16 px-6 rounded-b-[40px] shadow-lg">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center border border-white/30"
          >
            <Text className="text-white text-xl">←</Text>
          </TouchableOpacity>
          
          <View className="flex-1 items-center">
            <Text className="text-white text-2xl font-bold">Settings</Text>
            <Text className="text-emerald-100 text-sm">Manage your preferences</Text>
          </View>
          
          <View className="w-12" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 -mt-4" showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6 z-10">
          <View className="flex-row items-center">
            <View className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl items-center justify-center mr-4 shadow-lg">
              <Text className="text-white text-3xl">👤</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 font-bold text-xl mb-1">Dinu Perera</Text>
              <Text className="text-gray-500 text-base mb-2">dinu.perera@email.com</Text>
              <TouchableOpacity className="bg-emerald-100 rounded-xl px-4 py-2 self-start">
                <Text className="text-emerald-700 font-bold text-sm">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4 ml-2">Account</Text>
          
          <SettingItem
            icon="🐕"
            title="Pet Profiles"
            subtitle="Manage your pets information"
            onPress={() => console.log("Pet Profiles")}
          />
          
          <SettingItem
            icon="📋"
            title="Medical Records"
            subtitle="Health history and documents"
            onPress={() => console.log("Medical Records")}
          />
          
          <SettingItem
            icon="💳"
            title="Payment Methods"
            subtitle="Cards and billing information"
            onPress={() => console.log("Payment Methods")}
          />
          
          <SettingItem
            icon="📍"
            title="Saved Locations"
            subtitle="Vet clinics and favorite places"
            onPress={() => console.log("Saved Locations")}
          />
        </View>

        {/* Preferences */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4 ml-2">Preferences</Text>
          
          <SwitchItem
            icon="🔔"
            title="Push Notifications"
            subtitle="Reminders and updates"
            value={notifications}
            onValueChange={setNotifications}
          />
          
          <SwitchItem
            icon="📍"
            title="Location Services"
            subtitle="Find nearby vets and services"
            value={locationServices}
            onValueChange={setLocationServices}
            iconBg="from-blue-400 to-indigo-500"
          />
          
          <SwitchItem
            icon="🔐"
            title="Biometric Authentication"
            subtitle="Use fingerprint or face unlock"
            value={biometricAuth}
            onValueChange={setBiometricAuth}
            iconBg="from-purple-400 to-pink-500"
          />
          
          <SwitchItem
            icon="🌙"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            value={darkMode}
            onValueChange={setDarkMode}
            iconBg="from-gray-600 to-gray-800"
          />
          
          <SwitchItem
            icon="☁️"
            title="Auto Backup"
            subtitle="Backup data to cloud"
            value={autoBackup}
            onValueChange={setAutoBackup}
            iconBg="from-cyan-400 to-blue-500"
          />
        </View>

        {/* Support & Info */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4 ml-2">Support & Information</Text>
          
          <SettingItem
            icon="❓"
            title="Help Center"
            subtitle="FAQs and troubleshooting"
            onPress={() => console.log("Help Center")}
          />
          
          <SettingItem
            icon="📞"
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => console.log("Contact Support")}
          />
          
          <SettingItem
            icon="⭐"
            title="Rate Our App"
            subtitle="Share your feedback"
            onPress={() => console.log("Rate App")}
          />
          
          <SettingItem
            icon="📄"
            title="Terms & Privacy"
            subtitle="Legal information"
            onPress={() => console.log("Terms & Privacy")}
          />
          
          <SettingItem
            icon="ℹ️"
            title="About"
            subtitle="App version and information"
            onPress={() => console.log("About")}
          />
        </View>

        {/* Data & Storage */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4 ml-2">Data & Storage</Text>
          
          <SettingItem
            icon="📊"
            title="Storage Usage"
            subtitle="Manage app storage"
            onPress={() => console.log("Storage Usage")}
          />
          
          <SettingItem
            icon="📥"
            title="Export Data"
            subtitle="Download your pet's data"
            onPress={() => console.log("Export Data")}
          />
          
          <SettingItem
            icon="🗑️"
            title="Clear Cache"
            subtitle="Free up space"
            onPress={() => console.log("Clear Cache")}
          />
        </View>

        {/* Account Actions */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4 ml-2">Account Actions</Text>
          
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 rounded-2xl p-4 flex-row items-center shadow-sm border border-red-200 mb-3"
            activeOpacity={0.7}
          >
            <View className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl items-center justify-center mr-4 shadow-md">
              <Text className="text-white text-xl">🚪</Text>
            </View>
            <View className="flex-1">
              <Text className="text-red-700 font-bold text-lg mb-1">Logout</Text>
              <Text className="text-red-500 text-sm">Sign out of your account</Text>
            </View>
            <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center">
              <Text className="text-red-600 text-lg font-bold">›</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => Alert.alert("Delete Account", "This action cannot be undone")}
            className="bg-gray-50 rounded-2xl p-4 flex-row items-center shadow-sm border border-gray-200 mb-3"
            activeOpacity={0.7}
          >
            <View className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl items-center justify-center mr-4 shadow-md">
              <Text className="text-white text-xl">⚠️</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 font-bold text-lg mb-1">Delete Account</Text>
              <Text className="text-gray-500 text-sm">Permanently remove your account</Text>
            </View>
            <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
              <Text className="text-gray-600 text-lg font-bold">›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="bg-gray-100 rounded-2xl p-4 items-center mb-8">
          <Text className="text-gray-600 font-semibold text-lg mb-2">Pet Care Pro</Text>
          <Text className="text-gray-500 text-sm">Version 2.1.0</Text>
          <Text className="text-gray-400 text-xs mt-2">© 2024 Pet Care Solutions</Text>
        </View>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
};

export default SettingsPage;