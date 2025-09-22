import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";
import GradientView, { GradientPresets } from "../../components/GradientView";
import { FontAwesome5 } from "@expo/vector-icons";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (isLoading) return;
    if (password !== cPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setIsLoading(true);
    await register(email, password)
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        Alert.alert("Registration Failed", "Something went wrong");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="flex-1 bg-gray-100">
        {/* Header */}
        <GradientView
          colors={GradientPresets.tealToEmerald}
          className="pb-8 pt-16 px-6 rounded-b-[40px] shadow-lg"
        >
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center border border-white/30"
            >
              <Text className="text-white text-xl">←</Text>
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <Text className="text-white text-2xl font-bold">Create Account</Text>
              <Text className="text-teal-100 text-sm">Join PetCare Hub today</Text>
            </View>
            <View className="w-12" />
          </View>
        </GradientView>

        <ScrollView className="flex-1 px-6 -mt-4" showsVerticalScrollIndicator={false}>
          {/* Register Form */}
          <View className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 mb-6 mt-6">
            <Text className="text-gray-900 text-xl font-bold mb-6">Sign Up</Text>

            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 bg-teal-100 rounded-full items-center justify-center mr-3">
                  <FontAwesome5 name="envelope" size={18} color="#0d9488" />
                </View>
                <Text className="text-gray-900 font-semibold text-base">Email</Text>
              </View>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 bg-teal-100 rounded-full items-center justify-center mr-3">
                  <FontAwesome5 name="lock" size={18} color="#0d9488" />
                </View>
                <Text className="text-gray-900 font-semibold text-base">Password</Text>
              </View>
              <TextInput
                placeholder="Create a password"
                placeholderTextColor="#6b7280"
                value={password}
                onChangeText={setPassword}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 bg-teal-100 rounded-full items-center justify-center mr-3">
                  <FontAwesome5 name="lock" size={18} color="#0d9488" />
                </View>
                <Text className="text-gray-900 font-semibold text-base">Confirm Password</Text>
              </View>
              <TextInput
                placeholder="Confirm your password"
                placeholderTextColor="#6b7280"
                value={cPassword}
                onChangeText={setCPassword}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              className="bg-teal-600 rounded-xl py-4 items-center shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="large" />
              ) : (
                <Text className="text-white font-bold text-lg">Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center mb-8">
            <Text className="text-gray-600 text-base">Already have an account? </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text className="text-teal-600 font-semibold text-base">Sign In</Text>
            </Pressable>
          </View>

          {/* Bottom Spacing */}
          <View className="h-6" />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;