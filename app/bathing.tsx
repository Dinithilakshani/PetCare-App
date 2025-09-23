import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Bathing = () => {
  const router = useRouter();
  const [selectedPetType, setSelectedPetType] = useState('dog');

  const petTypes = [
    { id: 'dog', name: 'Dogs', icon: '🐕', frequency: '4-6 weeks' },
    { id: 'cat', name: 'Cats', icon: '🐱', frequency: '6-8 weeks' },
    { id: 'rabbit', name: 'Rabbits', icon: '🐰', frequency: '2-3 months' },
  ];

  const bathingSteps = {
    dog: [
      {
        title: 'Brush Before Bath',
        description: 'Remove loose fur and tangles to prevent clogging drains',
        icon: '🪮',
        duration: '5-10 min',
      },
      {
        title: 'Prepare Water Temperature',
        description: 'Use lukewarm water (37-38°C). Test with your elbow',
        icon: '🌡️',
        duration: '2 min',
      },
      {
        title: 'Wet Gradually',
        description: 'Start from legs and work up. Avoid face and ears initially',
        icon: '💧',
        duration: '3-5 min',
      },
      {
        title: 'Apply Shampoo',
        description: 'Use pet-specific shampoo. Work into a gentle lather',
        icon: '🧴',
        duration: '5-8 min',
      },
      {
        title: 'Rinse Thoroughly',
        description: 'Remove all soap residue. Leftover soap can cause irritation',
        icon: '🚿',
        duration: '5-10 min',
      },
      {
        title: 'Dry Carefully',
        description: 'Use towels first, then blow dryer on cool setting',
        icon: '🏺',
        duration: '10-15 min',
      },
    ],
    cat: [
      {
        title: 'Trim Nails First',
        description: 'Prevent scratching during the bath. Trim carefully',
        icon: '✂️',
        duration: '5 min',
      },
      {
        title: 'Use Minimal Water',
        description: 'Fill tub with 2-3 inches of lukewarm water only',
        icon: '🛁',
        duration: '2 min',
      },
      {
        title: 'Gentle Introduction',
        description: 'Lower slowly, speak softly, offer treats for comfort',
        icon: '🤲',
        duration: '3-5 min',
      },
      {
        title: 'Quick Washing',
        description: 'Work quickly with cat shampoo. Focus on dirty areas',
        icon: '⚡',
        duration: '3-5 min',
      },
      {
        title: 'Rinse Fast',
        description: 'Quick but thorough rinse. Minimize stress time',
        icon: '💨',
        duration: '3-5 min',
      },
      {
        title: 'Wrap & Dry',
        description: 'Wrap in warm towel immediately. Air dry in warm room',
        icon: '🏠',
        duration: '15-20 min',
      },
    ],
    rabbit: [
      {
        title: 'Spot Clean Only',
        description: 'Rabbits rarely need full baths. Clean soiled areas only',
        icon: '🎯',
        duration: '5 min',
      },
      {
        title: 'Prepare Shallow Basin',
        description: 'Use very shallow lukewarm water in small basin',
        icon: '🥣',
        duration: '2 min',
      },
      {
        title: 'Clean Bottom Area',
        description: 'Focus on hindquarters if soiled. Be very gentle',
        icon: '🧽',
        duration: '3-5 min',
      },
      {
        title: 'Use Rabbit Shampoo',
        description: 'Only use rabbit-safe products. Avoid getting wet',
        icon: '🧴',
        duration: '2-3 min',
      },
      {
        title: 'Rinse Carefully',
        description: 'Minimal water, focus on removing soap completely',
        icon: '💧',
        duration: '3-5 min',
      },
      {
        title: 'Dry Thoroughly',
        description: 'Dry completely to prevent hypothermia. Keep warm',
        icon: '🔥',
        duration: '20-30 min',
      },
    ],
  };

  const supplies = [
    'Pet Shampoo',
    'Towels (2-3)',
    'Non-slip Mat',
    'Cotton Balls',
    'Brush/Comb',
    'Treats',
    'Hair Dryer',
    'Ear Cleaner',
  ];

  const getFrequency = () => {
    const pet = petTypes.find(p => p.id === selectedPetType);
    return pet ? pet.frequency : '';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          onPress={() => router.navigate('/home')}
        >
          <Icon name="chevron-left" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Bathing Guide</Text>
        <Text style={styles.headerSubtitle}>Keep your pets clean and healthy</Text>
      </View>

      {/* Pet Type Selection */}
      <View style={styles.animalSelector}>
        {petTypes.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={[styles.animalButton, selectedPetType === pet.id && styles.selectedAnimal]}
            onPress={() => setSelectedPetType(pet.id)}
          >
            <Text style={[styles.animalButtonText, selectedPetType === pet.id && styles.selectedAnimalText]}>
              {pet.icon} {pet.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Bathing Basics</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Frequency</Text>
            <Text style={styles.statValue}>{getFrequency()}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Water Temp</Text>
            <Text style={styles.statValue}>Lukewarm (37-38°C)</Text>
          </View>
        </View>
      </View>

      {/* Bathing Steps */}
      <View style={styles.foodSection}>
        <Text style={styles.sectionTitle}>🛁 Bathing Steps</Text>
        {bathingSteps[selectedPetType].map((step, index) => (
          <View key={index} style={styles.foodCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.foodTitle}>{step.title}</Text>
              <View style={styles.safetyBadge}>
                <Text style={styles.safetyText}>{step.duration}</Text>
              </View>
            </View>
            <Text style={styles.foodDescription}>{step.description}</Text>
          </View>
        ))}
      </View>

      {/* Supplies Needed */}
      <View style={styles.forbiddenSection}>
        <Text style={styles.forbiddenTitle}>🛒 Supplies Needed</Text>
        <View style={styles.forbiddenGrid}>
          {supplies.map((supply, index) => (
            <View key={index} style={styles.forbiddenItem}>
              <Text style={styles.forbiddenText}>{supply}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
        <View style={styles.tipItem}>
          <Text style={styles.tipText}>• Always reward your pet with treats and praise during and after bathing</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipText}>• Never leave your pet unattended in water, even for a moment</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipText}>• Water should be lukewarm - test with your elbow like baby's bath</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipText}>• Consult your vet if your pet has skin issues</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#0d9488',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    padding: 8,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ccfbf1',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  animalSelector: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  animalButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#99f6e4',
  },
  selectedAnimal: {
    borderColor: '#0d9488',
    backgroundColor: '#ccfbf1',
  },
  animalButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  selectedAnimalText: {
    color: '#0d9488',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  foodSection: {
    padding: 20,
  },
  foodCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  safetyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
    backgroundColor: '#10b981',
  },
  safetyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  foodDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 10,
  },
  forbiddenSection: {
    backgroundColor: '#fef2f2',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  forbiddenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f1d1d',
    marginBottom: 15,
  },
  forbiddenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  forbiddenItem: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  forbiddenText: {
    fontSize: 12,
    color: '#7f1d1d',
    fontWeight: '500',
  },
  tipsSection: {
    backgroundColor: '#ccfbf1',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#99f6e4',
    marginBottom: 40,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#134e4a',
    marginBottom: 15,
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#134e4a',
    lineHeight: 20,
  },
});

export default Bathing; 