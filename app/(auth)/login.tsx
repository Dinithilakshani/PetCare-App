import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, { BounceIn, FadeIn } from "react-native-reanimated";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/home");
    } catch (err) {
      Alert.alert("Login Failed", "Incorrect email or password");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        colors={["#0d9488", "#059669"]}
        style={styles.gradient}
      >
        <Animated.View entering={BounceIn.duration(1000)} style={styles.card}>
          <View style={styles.header}>
            <FontAwesome5 name="paw" size={40} color="#0d9488" />
            <Text style={styles.title}>PetCare Hub</Text>
            <Text style={styles.subtitle}>Login to care for your furry friends!</Text>
          </View>

          <Animated.View entering={FadeIn.duration(800).delay(200)} style={styles.form}>
            <View style={styles.inputWrapper}>
              <FontAwesome5 name="envelope" size={20} color="#0d9488" style={styles.icon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <FontAwesome5 name="lock" size={20} color="#0d9488" style={styles.icon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#6b7280"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.toggleIcon}
              >
                <FontAwesome5
                  name={showPassword ? "eye" : "eye-slash"}
                  size={18}
                  color="#0d9488"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/register")}
              style={styles.registerButton}
            >
              <Text style={styles.registerText}>
                New to PetCare? <Text style={styles.registerLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // bg-gray-100
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff", // bg-white
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#e5e7eb", // border-gray-200
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827", // text-gray-900
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563", // text-gray-600
    marginTop: 8,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff", // bg-white
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb", // border-gray-200
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827", // text-gray-900
  },
  toggleIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#0d9488", // bg-teal-600
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#99f6e4", // bg-teal-200
  },
  buttonText: {
    color: "#ffffff", // text-white
    fontSize: 18,
    fontWeight: "600",
  },
  registerButton: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#4b5563", // text-gray-600
  },
  registerLink: {
    color: "#0d9488", // text-teal-600
    fontWeight: "600",
  },
});

export default Login;