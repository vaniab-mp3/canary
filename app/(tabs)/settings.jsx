import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#FFF8F0';
const CARD_BG = '#F5E2C8';
const ORANGE = '#E07B39';
const DARK = '#2C1A0E';
const MID = '#B89A72';
const MUTED = '#888';

function SectionLabel({ title }) {
  return <Text style={styles.sectionLabel}>{title}</Text>;
}

function RowChevron() {
  return <Ionicons name="chevron-forward" size={16} color={DARK} style={{ opacity: 0.35 }} />;
}

function TappableRow({ icon, iconColor = MID, label, sublabel, onPress, right }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.rowIcon, { backgroundColor: iconColor === ORANGE ? 'rgba(224,123,57,0.15)' : 'rgba(184,154,114,0.18)' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        {sublabel ? <Text style={styles.rowSub}>{sublabel}</Text> : null}
      </View>
      {right ?? <RowChevron />}
    </TouchableOpacity>
  );
}

export default function Settings() {
  const [locationEnabled, setLocationEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page title ───────────────────────────────────────────── */}
        <Text style={styles.pageTitle}>Settings</Text>

        {/* ── Profile block ────────────────────────────────────────── */}
        <View style={styles.profileBlock}>
          <View style={styles.avatarRing}>
            <Ionicons name="person" size={28} color="#fff" />
          </View>
          <View style={styles.profileNameRow}>
            <Text style={styles.profileName}>Asmi Sathaye</Text>
            <View style={styles.privacyPill}>
              <Ionicons name="shield-checkmark-outline" size={11} color="#7A5C3A" />
              <Text style={styles.privacyPillText}>name not shared with others</Text>
            </View>
          </View>
          <Text style={styles.profileUsername}>@sunflower_84</Text>
        </View>

        {/* ── Account ──────────────────────────────────────────────── */}
        <SectionLabel title="Account" />
        <View style={styles.card}>
          <TappableRow
            icon="lock-closed-outline"
            iconColor={ORANGE}
            label="Change password"
            sublabel="Update your login password"
            onPress={() => Alert.alert('Change password', 'Navigate to change password screen.')}
          />
          <View style={styles.divider} />
          <TappableRow
            icon="call-outline"
            iconColor={ORANGE}
            label="Emergency ping number"
            sublabel="+1 (555) 012-3456"
            onPress={() => Alert.alert('Emergency ping', 'Navigate to edit emergency number.')}
          />
        </View>

        {/* ── Privacy ──────────────────────────────────────────────── */}
        <SectionLabel title="Privacy" />
        <View style={styles.card}>
          <TappableRow
            icon="navigate-outline"
            label="Location access"
            sublabel="Used for emergency ping only"
            right={
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: '#C8B49A', true: ORANGE }}
                thumbColor="#fff"
                ios_backgroundColor="#C8B49A"
              />
            }
          />
        </View>

        {/* ── Language ─────────────────────────────────────────────── */}
        <SectionLabel title="Language" />
        <View style={styles.card}>
          <TappableRow
            icon="globe-outline"
            label="App language"
            onPress={() => Alert.alert('Language', 'Navigate to language picker.')}
            right={
              <View style={styles.langRight}>
                <View style={styles.langBadge}>
                  <Text style={styles.langBadgeText}>EN</Text>
                </View>
                <Text style={styles.langAlt}>ES</Text>
                <RowChevron />
              </View>
            }
          />
        </View>

        {/* ── More ─────────────────────────────────────────────────── */}
        <SectionLabel title="More" />
        <View style={styles.card}>
          <TappableRow
            icon="information-circle-outline"
            label="About & legal"
            onPress={() => Alert.alert('About', 'Navigate to about screen.')}
          />
          <View style={styles.divider} />
          <TappableRow
            icon="log-out-outline"
            iconColor={ORANGE}
            label="Sign out"
            onPress={() =>
              Alert.alert('Sign out', 'Are you sure you want to sign out?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign out', style: 'destructive', onPress: () => {} },
              ])
            }
            right={null}
          />
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  container: { flex: 1, backgroundColor: BG },
  contentContainer: { paddingHorizontal: 20, paddingTop: 16 },

  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: DARK,
    letterSpacing: -0.3,
    marginBottom: 4,
  },

  // Profile
  profileBlock: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: DARK,
  },
  privacyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(160,128,90,0.18)',
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  privacyPillText: {
    fontSize: 11,
    color: '#7A5C3A',
  },
  profileUsername: {
    fontSize: 13,
    color: MUTED,
  },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: MID,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingVertical: 8,
    paddingLeft: 2,
    marginTop: 8,
  },

  // Card
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(160,128,90,0.3)',
    marginLeft: 62,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1 },
  rowLabel: { fontSize: 15, fontWeight: '500', color: DARK },
  rowSub: { fontSize: 12, color: MID, marginTop: 1 },

  // Language
  langRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langBadge: {
    backgroundColor: ORANGE,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  langBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  langAlt: {
    fontSize: 13,
    color: MUTED,
  },
});
