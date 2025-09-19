import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { TailwindProvider } from 'tailwind-rn';
import { LinearGradient } from 'expo-linear-gradient';
import utilities from './tailwind.json';
import { login } from '@/services/authService';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await login(email, password)
      .then(() => {
        router.push('/home');
      })
      .catch((err) => {
        Alert.alert('Login Failed', 'Something went wrong');
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <TailwindProvider utilities={utilities}>
      <ImageBackground
        source={{ uri: 'https://placeimg.com/640/480/animals' }}
        className="flex-1"
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(255,248,225,0.8)', 'rgba(77,182,172,0.7)']}
          className="flex-1 justify-center items-center p-6"
        >
          {/* Logo/Title */}
          <View className="mb-8 items-center">
            <Text className="text-4xl font-bold text-teal">Pet Care</Text>
            <Text className="text-lg text-gray-700 mt-1">Sign in to care for your pets!</Text>
          </View>

          {/* Input Fields */}
          <View className="w-full max-w-md">
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="bg-cream border border-teal rounded-lg px-4 py-3 mb-4 text-teal text-lg shadow-sm"
              placeholderTextColor="#4DB6AC"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-cream border border-teal rounded-lg px-4 py-3 mb-4 text-teal text-lg shadow-sm"
              placeholderTextColor="#4DB6AC"
            />

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-yellow rounded-lg p-4 items-center shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#4DB6AC" size="large" />
              ) : (
                <Text className="text-teal font-bold text-xl">Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <Pressable
            className="mt-4"
            onPress={() => router.push('/register')}
          >
            <Text className="text-teal text-lg underline">
              Don't have an account? Register
            </Text>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </TailwindProvider>
  );
};

export default Login;



