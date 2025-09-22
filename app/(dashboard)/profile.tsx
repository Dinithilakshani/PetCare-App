import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GradientView, { GradientPresets } from '@/components/GradientView';
import { useRouter } from 'expo-router';
import { updateEmail, updateProfile } from 'firebase/auth';
import { uploadToCloudinary } from '@/services/imageUploadService';
import { useAuth } from '@/context/AuthContext';

const ProfileEditScreen = () => {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [localImageUri, setLocalImageUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? '');
      setEmail(user.email ?? '');
      setPhotoURL(user.photoURL ?? null);
    }
  }, [user]);

  const pickImage = async () => {
    try {
      const ImagePicker = await import('expo-image-picker').catch(() => null);
      if (!ImagePicker) {
        Alert.alert('Image Picker not installed', 'Please install expo-image-picker to change profile photos.');
        return;
      }    
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need media library permission to select a photo.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setLocalImageUri(result.assets[0].uri);
      }
    } catch (e) {
      console.error('pickImage error', e);
      Alert.alert('Error', 'Failed to open image picker');
    }
  };

  const uploadPhotoIfNeeded = async (): Promise<string | null> => {
    if (!localImageUri || !user) return photoURL ?? null;
    try {
      // Upload to Cloudinary (free tier) instead of Firebase Storage
      const url = await uploadToCloudinary(localImageUri);
      return url ?? null;
    } catch (e) {
      console.error('uploadPhoto error', e);
      Alert.alert('Upload Failed', 'Could not upload profile picture');
      return photoURL ?? null;
    }
  };

  const handleSave = async () => {
    if (!user) return;
    if (!displayName.trim()) {
      Alert.alert('Validation', 'Name is required');
      return;
    }
    setSaving(true);
    try {
      const newPhotoUrl = await uploadPhotoIfNeeded();

      // Update display name and photo
      await updateProfile(user, {
        displayName: displayName.trim(),
        photoURL: newPhotoUrl ?? undefined,
      });

      // Update email if changed (may require recent login)
      if (email.trim() && email.trim() !== (user.email ?? '')) {
        try {
          await updateEmail(user, email.trim());
        } catch (e: any) {
          console.warn('updateEmail failed', e);
          Alert.alert('Email Update', 'We could not update your email. You may need to re-login for security.');
        }
      }

      // Refresh auth user so updated photoURL is persisted in context
      await refreshUser();

      Alert.alert('Success', 'Profile updated successfully');
      router.back();
    } catch (e) {
      console.error('Save profile failed', e);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const currentImage = localImageUri || photoURL || undefined;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View className="flex-1 bg-gray-100">
        <GradientView colors={GradientPresets.tealToEmerald} className="pb-6 pt-16 px-6 rounded-b-[40px]">
          <Text className="text-white text-2xl font-bold">Edit Profile</Text>
          <Text className="text-emerald-100 mt-1">Update your personal information</Text>
        </GradientView>

        <ScrollView className="flex-1 px-6 pt-6">
          <View className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6 items-center">
            {/* Avatar */}
            <View className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden items-center justify-center mb-4">
              {currentImage ? (
                <Image source={{ uri: currentImage }} style={{ width: '100%', height: '100%' }} />
              ) : (
                <Text className="text-gray-500 text-3xl">👤</Text>
              )}
            </View>
            <TouchableOpacity onPress={pickImage} className="bg-teal-100 px-4 py-2 rounded-xl border border-teal-200">
              <Text className="text-teal-700 font-semibold">Change Picture</Text>
            </TouchableOpacity>
          </View>

          {/* Name */}
          <View className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Name</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 text-base"
              placeholder="Your name"
              placeholderTextColor="#94a3b8"
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>

          {/* Email */}
          <View className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Email</Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 text-base"
              placeholder="Your email"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Text className="text-gray-500 text-xs mt-2">Changing email may require re-login.</Text>
          </View>

          {/* Save */}
          <TouchableOpacity onPress={handleSave} disabled={saving} className="active:scale-95 mb-6">
            <GradientView colors={GradientPresets.tealToEmerald} className="rounded-2xl py-4 px-6 items-center shadow-lg">
              <Text className="text-white text-lg font-bold">{saving ? 'Saving...' : 'Save Changes'}</Text>
            </GradientView>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity onPress={() => router.back()} className="bg-gray-100 rounded-2xl py-4 px-6 items-center mb-10 border border-gray-200">
            <Text className="text-gray-700 text-lg font-bold">Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileEditScreen;
