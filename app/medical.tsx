import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GradientView, { GradientPresets } from '../components/GradientView';

interface MedicalItem {
  condition: string;
  description: string;
  urgency: 'high' | 'medium' | 'low' | 'routine';
}

interface MedicalCategory {
  title: string;
  items: MedicalItem[];
}

interface MedicalData {
  dog: {
    puppy: MedicalCategory;
    adult: MedicalCategory;
    senior: MedicalCategory;
  };
  cat: {
    puppy: MedicalCategory;
    adult: MedicalCategory;
    senior: MedicalCategory;
  };
  rabbit: {
    puppy: MedicalCategory;
    adult: MedicalCategory;
    senior: MedicalCategory;
  };
}

const medicalData: MedicalData = {
  dog: {
    puppy: {
      title: 'Puppy Care (0-12 months)',
      items: [
        {
          condition: 'Vaccination Schedule',
          description: 'DHPP series at 6, 9, 12 weeks. Rabies at 12-16 weeks.',
          urgency: 'routine',
        },
        {
          condition: 'Deworming',
          description: 'Every 2-3 weeks until 6 months old.',
          urgency: 'routine',
        },
        {
          condition: 'Teething Issues',
          description: 'Provide appropriate chew toys. Monitor for retained baby teeth.',
          urgency: 'low',
        },
        {
          condition: 'Diarrhea',
          description: 'Common due to diet changes. Monitor hydration.',
          urgency: 'medium',
        },
      ],
    },
    adult: {
      title: 'Adult Dog Care (1-7 years)',
      items: [
        {
          condition: 'Annual Checkup',
          description: 'Yearly physical exam, vaccinations, and dental cleaning.',
          urgency: 'routine',
        },
        {
          condition: 'Heartworm Prevention',
          description: 'Monthly preventive medication year-round.',
          urgency: 'high',
        },
        {
          condition: 'Joint Care',
          description: 'Monitor for limping or stiffness. Maintain healthy weight.',
          urgency: 'medium',
        },
        {
          condition: 'Dental Health',
          description: 'Regular teeth brushing and dental treats.',
          urgency: 'routine',
        },
      ],
    },
    senior: {
      title: 'Senior Dog Care (7+ years)',
      items: [
        {
          condition: 'Bi-annual Checkups',
          description: 'Every 6 months with blood work and organ function tests.',
          urgency: 'routine',
        },
        {
          condition: 'Arthritis Management',
          description: 'Joint supplements, weight management, gentle exercise.',
          urgency: 'medium',
        },
        {
          condition: 'Cognitive Changes',
          description: 'Mental stimulation, consistent routine, night lights.',
          urgency: 'low',
        },
        {
          condition: 'Heart Monitoring',
          description: 'Regular cardiac screening for murmurs or irregularities.',
          urgency: 'high',
        },
      ],
    },
  },
  cat: {
    puppy: {
      title: 'Kitten Care (0-12 months)',
      items: [
        {
          condition: 'Vaccination Schedule',
          description: 'FVRCP series at 6, 9, 12 weeks. Rabies at 12-16 weeks.',
          urgency: 'routine',
        },
        {
          condition: 'Spay/Neuter',
          description: 'Recommended between 4-6 months of age.',
          urgency: 'routine',
        },
        {
          condition: 'Litter Training',
          description: 'Most kittens learn naturally. Keep box clean and accessible.',
          urgency: 'low',
        },
        {
          condition: 'Upper Respiratory',
          description: 'Common in young cats. Watch for sneezing and discharge.',
          urgency: 'medium',
        },
      ],
    },
    adult: {
      title: 'Adult Cat Care (1-7 years)',
      items: [
        {
          condition: 'Annual Wellness',
          description: 'Yearly exam with core vaccinations and parasite screening.',
          urgency: 'routine',
        },
        {
          condition: 'Dental Care',
          description: 'Regular dental cleanings to prevent periodontal disease.',
          urgency: 'routine',
        },
        {
          condition: 'Urinary Health',
          description: 'Monitor litter box habits. Ensure adequate water intake.',
          urgency: 'high',
        },
        {
          condition: 'Weight Management',
          description: 'Indoor cats prone to obesity. Monitor food portions.',
          urgency: 'medium',
        },
      ],
    },
    senior: {
      title: 'Senior Cat Care (7+ years)',
      items: [
        {
          condition: 'Kidney Function',
          description: 'Regular blood work to monitor kidney health.',
          urgency: 'high',
        },
        {
          condition: 'Thyroid Screening',
          description: 'Check for hyperthyroidism with annual blood tests.',
          urgency: 'routine',
        },
        {
          condition: 'Arthritis Care',
          description: 'Soft bedding, easy litter box access, pain management.',
          urgency: 'medium',
        },
        {
          condition: 'Dental Disease',
          description: 'More common in seniors. Professional cleaning may be needed.',
          urgency: 'medium',
        },
      ],
    },
  },
  rabbit: {
    puppy: {
      title: 'Young Rabbit Care (0-6 months)',
      items: [
        {
          condition: 'Initial Vet Exam',
          description: 'Within first week. Check for congenital issues and establish baseline health.',
          urgency: 'routine',
        },
        {
          condition: 'Spay/Neuter Scheduling',
          description: 'Plan surgery for 4-6 months old. Prevents reproductive cancers.',
          urgency: 'routine',
        },
        {
          condition: 'GI Stasis Prevention',
          description: 'Monitor appetite and fecal output daily. Critical in young rabbits.',
          urgency: 'high',
        },
        {
          condition: 'Proper Diet Introduction',
          description: 'Gradual introduction of vegetables. Watch for diarrhea or soft stools.',
          urgency: 'medium',
        },
        {
          condition: 'Parasite Screening',
          description: 'Check for coccidia and other intestinal parasites common in young rabbits.',
          urgency: 'medium',
        },
      ],
    },
    adult: {
      title: 'Adult Rabbit Care (6 months - 5 years)',
      items: [
        {
          condition: 'Annual Wellness Exam',
          description: 'Yearly check-up with exotic veterinarian. Include dental and weight assessment.',
          urgency: 'routine',
        },
        {
          condition: 'Dental Health Monitoring',
          description: 'Watch for overgrown teeth, drooling, or difficulty eating. Provide unlimited timothy hay.',
          urgency: 'high',
        },
        {
          condition: 'Spay/Neuter',
          description: 'Essential for health and behavior. Prevents uterine/testicular cancer.',
          urgency: 'routine',
        },
        {
          condition: 'GI Health Maintenance',
          description: 'Monitor cecotrophy behavior and maintain high-fiber diet. Watch for gas or bloating.',
          urgency: 'high',
        },
        {
          condition: 'Nail Trimming',
          description: 'Trim every 4-6 weeks to prevent overgrowth and injury.',
          urgency: 'routine',
        },
        {
          condition: 'Vaccinations',
          description: 'RHDV2 vaccine recommended. Consult exotic vet about regional disease risks.',
          urgency: 'medium',
        },
      ],
    },
    senior: {
      title: 'Senior Rabbit Care (5+ years)',
      items: [
        {
          condition: 'Bi-annual Checkups',
          description: 'Every 6 months with blood work. Monitor kidney and liver function.',
          urgency: 'routine',
        },
        {
          condition: 'Arthritis Management',
          description: 'Soft flooring, easy access to food/water. Pain medication if needed.',
          urgency: 'medium',
        },
        {
          condition: 'Dental Disease Monitoring',
          description: 'More frequent dental checks. Watch for tooth root abscesses and malocclusion.',
          urgency: 'high',
        },
        {
          condition: 'Weight Management',
          description: 'Monitor for weight loss or obesity. Adjust diet as metabolism changes.',
          urgency: 'medium',
        },
        {
          condition: 'Kidney Function',
          description: 'Regular blood chemistry panels to detect early kidney disease.',
          urgency: 'high',
        },
        {
          condition: 'Mobility Support',
          description: 'Lower litter box sides, soft bedding, gentle exercise to maintain mobility.',
          urgency: 'low',
        },
      ],
    },
  },
};

const MedicalPage: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<'puppy' | 'adult' | 'senior'>('puppy');
  const [selectedAnimal, setSelectedAnimal] = useState<'dog' | 'cat' | 'rabbit'>('dog');
  const navigation = useNavigation();

  const getUrgencyColor = (urgency: string): string => {
    switch (urgency) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-400';
      case 'low':
        return 'bg-green-400';
      default:
        return 'bg-blue-400';
    }
  };

  const getUrgencyText = (urgency: string): string => {
    switch (urgency) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Moderate';
      case 'low':
        return 'Low Priority';
      default:
        return 'Routine Care';
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <GradientView colors={GradientPresets.tealToEmerald} className="p-5 pt-12 rounded-b-3xl relative">
          <TouchableOpacity
            className="absolute top-12 left-5 p-2 active:scale-95 transition-transform"
            onPress={() => navigation.navigate('/(dashboard)/home')}
          >
            <Icon name="chevron-left" size={28} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-3xl font-extrabold text-white text-center">Pet Medical Care</Text>
          <Text className="text-base text-teal-100 text-center mt-1 opacity-90">
            Health guidance by age and species
          </Text>
        </GradientView>

        {/* Animal Selection */}
        <View className="flex-row px-5 py-5 gap-2">
          <TouchableOpacity
            className={`flex-1 bg-white py-4 rounded-xl border-2 border-teal-100 text-gray-500 font-semibold text-center ${
              selectedAnimal === 'dog' ? 'border-teal-500 bg-teal-100' : ''
            } active:scale-95 transition-transform`}
            onPress={() => setSelectedAnimal('dog')}
          >
            <Text className={`text-base ${selectedAnimal === 'dog' ? 'text-teal-600' : 'text-gray-500'}`}>
              🐕 Dogs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 bg-white py-4 rounded-xl border-2 border-teal-100 text-gray-500 font-semibold text-center ${
              selectedAnimal === 'cat' ? 'border-teal-500 bg-teal-100' : ''
            } active:scale-95 transition-transform`}
            onPress={() => setSelectedAnimal('cat')}
          >
            <Text className={`text-base ${selectedAnimal === 'cat' ? 'text-teal-600' : 'text-gray-500'}`}>
              🐱 Cats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 bg-white py-4 rounded-xl border-2 border-teal-100 text-gray-500 font-semibold text-center ${
              selectedAnimal === 'rabbit' ? 'border-teal-500 bg-teal-100' : ''
            } active:scale-95 transition-transform`}
            onPress={() => setSelectedAnimal('rabbit')}
          >
            <Text className={`text-base ${selectedAnimal === 'rabbit' ? 'text-teal-600' : 'text-gray-500'}`}>
              🐰 Rabbits
            </Text>
          </TouchableOpacity>
        </View>

        {/* Age Selection */}
        <View className="flex-row px-5 pb-5 gap-2">
          <TouchableOpacity
            className={`flex-1 bg-white py-3 rounded-lg border border-teal-100 text-gray-500 font-medium text-center ${
              selectedAge === 'puppy' ? 'border-teal-500 bg-teal-100' : ''
            } active:scale-95 transition-transform`}
            onPress={() => setSelectedAge('puppy')}
          >
            <Text className={`text-sm ${selectedAge === 'puppy' ? 'text-teal-600' : 'text-gray-500'}`}>
              Young
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 bg-white py-3 rounded-lg border border-teal-100 text-gray-500 font-medium text-center ${
              selectedAge === 'adult' ? 'border-teal-500 bg-teal-100' : ''
            } active:scale-95 transition-transform`}
            onPress={() => setSelectedAge('adult')}
          >
            <Text className={`text-sm ${selectedAge === 'adult' ? 'text-teal-600' : 'text-gray-500'}`}>
              Adult
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 bg-white py-3 rounded-lg border border-teal-100 text-gray-500 font-medium text-center ${
              selectedAge === 'senior' ? 'border-teal-500 bg-teal-100' : ''
            } active:scale-95 transition-transform`}
            onPress={() => setSelectedAge('senior')}
          >
            <Text className={`text-sm ${selectedAge === 'senior' ? 'text-teal-600' : 'text-gray-500'}`}>
              Senior
            </Text>
          </TouchableOpacity>
        </View>

        {/* Medical Information */}
        <View className="p-5">
          <Text className="text-2xl font-bold text-gray-900 mb-5">
            {medicalData[selectedAnimal][selectedAge].title}
          </Text>
          {medicalData[selectedAnimal][selectedAge].items.map((item, index) => (
            <View key={index} className="bg-white rounded-xl p-4 mb-4 border border-gray-200" style={styles.cardShadow}>
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-lg font-semibold text-gray-900 flex-1">{item.condition}</Text>
                <View className={`px-2 py-1 rounded-md ${getUrgencyColor(item.urgency)}`}>
                  <Text className="text-xs font-semibold text-white">{getUrgencyText(item.urgency)}</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-600 leading-5">{item.description}</Text>
            </View>
          ))}
        </View>

        {/* Emergency Contact */}
        <View className="bg-red-50 m-5 p-5 rounded-xl border border-red-100 mb-10">
          <Text className="text-lg font-bold text-red-600 mb-2">🚨 Emergency Contact</Text>
          <Text className="text-sm text-red-700 leading-5 mb-3">
            If your pet shows signs of severe illness, difficulty breathing, or injury, contact your veterinarian
            immediately or visit the nearest emergency animal hospital.
          </Text>
          {selectedAnimal === 'rabbit' && (
            <View className="bg-red-100 p-3 rounded-lg border border-red-200">
              <Text className="text-xs text-red-700 font-medium">
                <Text className="font-bold">Rabbit Emergency Signs:</Text> Not eating for 12+ hours, no fecal pellets for 12+ hours, 
                difficulty breathing, head tilt, dragging limbs, or seizures require immediate exotic vet care.
              </Text>
            </View>
          )}
        </View>

        {/* Rabbit-Specific Care Tips */}
        {selectedAnimal === 'rabbit' && (
          <View className="bg-teal-50 m-5 p-5 rounded-xl border border-teal-100 mb-10">
            <Text className="text-lg font-bold text-teal-600 mb-3">🐰 Rabbit Care Essentials</Text>
            <View className="space-y-2">
              <Text className="text-sm text-teal-800">• <Text className="font-medium">Find an Exotic Vet:</Text> Rabbits require specialized veterinary care</Text>
              <Text className="text-sm text-teal-800">• <Text className="font-medium">Daily Health Checks:</Text> Monitor appetite, fecal output, and behavior</Text>
              <Text className="text-sm text-teal-800">• <Text className="font-medium">GI Stasis:</Text> The #1 killer of pet rabbits - seek immediate help if rabbit stops eating</Text>
              <Text className="text-sm text-teal-800">• <Text className="font-medium">Spay/Neuter:</Text> Prevents reproductive cancers (80%+ risk in unaltered females)</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default MedicalPage;