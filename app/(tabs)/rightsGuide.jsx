import { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function BulletLine({ bold, rest }) {
  return (
    <Text style={styles.bullet}>
      {'• '}
      {bold ? <Text style={styles.boldCaps}>{bold}</Text> : null}
      {rest}
    </Text>
  );
}

export default function RightsGuide() {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 1;
    Animated.timing(flipAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Text style={styles.pageTitle}>Know Your Rights</Text>
        <Text style={styles.pageSubtitle}>
          Information and resources to facilitate safer encounters with
          immigration enforcement.
        </Text>

        {/* Flip Card */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={handleFlip}
          style={styles.cardContainer}
        >
          {/* Front */}
          <Animated.View
            style={[
              styles.card,
              { transform: [{ rotateY: frontRotate }] },
            ]}
          >
            <Text style={styles.cardTitle}>You Have Constitutional Rights!</Text>

            <BulletLine
              bold="DO NOT OPEN THE DOOR"
              rest=" if an immigration agent is knocking."
            />
            <BulletLine
              bold="DO NOT ANSWER QUESTIONS"
              rest=" from an immigration agent. You have the right to remain silent."
            />
            <BulletLine
              bold="DO NOT SIGN ANYTHING"
              rest=" before speaking with a lawyer."
            />
            <BulletLine rest="Ask if you are free to leave. If yes, leave calmly." />
            <BulletLine
              bold="SHOW THIS CARD TO THE AGENT."
            />
          </Animated.View>

          {/* Back */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { transform: [{ rotateY: backRotate }] },
            ]}
          >
            <Text style={styles.cardTitle}>You Have Constitutional Rights!</Text>

            <BulletLine
              rest="I do not wish to speak with you, answer questions, or sign documents based on my "
            />
            <Text style={[styles.bullet, { marginTop: -8 }]}>
              {'  '}
              <Text style={styles.boldCaps}>5th Amendment rights.</Text>
            </Text>

            <BulletLine rest="I do not give permission to enter my home without a warrant signed by a judge." />
            <BulletLine rest="I do not give permission to search my belongings." />
            <BulletLine rest="I choose to exercise my constitutional rights." />
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.hint}>Tap card to flip</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },

  // Header
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C1A0E',
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 20,
  },

  // Card container (sets the height so both absolute faces have a bounding box)
  cardContainer: {
    width: '90%',
    height: 480,
  },

  // Shared card face styles
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#C0392B',
    borderRadius: 16,
    padding: 24,
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  cardBack: {
    // no extra overrides needed; backfaceVisibility handles the flip logic
  },

  // Card text
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  bullet: {
    fontSize: 15,
    lineHeight: 24,
    color: '#fff',
    marginBottom: 12,
  },
  boldCaps: {
    fontWeight: '800',
    color: '#fff',
  },

  // Hint beneath card
  hint: {
    marginTop: 14,
    fontSize: 12,
    color: '#999',
  },
});
