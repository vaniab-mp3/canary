import { useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Pressable,
} from 'react-native';

function PingButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.pingButton} onPress={onPress}>
      <Ionicons name="warning" size={28} color="white" />
    </TouchableOpacity>
  );
}

// Ping pop up 
function PingModal({ visible, onClose, onConfirm }) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.popupWrapper}>
          <View style={styles.popup}>
            <Text style={styles.title}>
              Send alert message to{'\n'}your emergency contacts?
            </Text>
            <View style={styles.divider} />
            <Text style={styles.messagePreview}>"ICE has detained me!"</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton} onPress={onClose}>
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.pointer} />
        </View>
      </Pressable>
    </Modal>
  );
}

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
    // TODO: wire up emergency alert once the team decides on the approach.
    // Canary will NOT send user location — alerts are message-only.
    //
    // const message = 'ICE has detained me!';
    // const phone = ''; // trusted contact number from Vault/settings
    // const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    // Linking.openURL(url).catch(() => {});
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#E07B39',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="rightsGuide"
          options={{
            title: 'Rights Guide',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="shield-checkmark-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ping"
          options={{
            title: 'Ping',
            tabBarIcon: () => null,
            tabBarButton: () => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <PingButton onPress={() => setModalVisible(true)} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="vault"
          options={{
            title: 'Vault',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document-text-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <PingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF8F0',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 80,
    paddingBottom: 10,
  },
  pingButton: {
    backgroundColor: '#E07B39',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 90,
  },
  popupWrapper: {
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#FDE3CE',
    borderColor: '#E07B39',
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: 320,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E07B39',
    width: '90%',
    marginBottom: 10,
  },
  messagePreview: {
    fontSize: 18,
    color: '#E07B39',
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  yesButton: {
    backgroundColor: '#E07B39',
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  yesText: { color: 'white', fontWeight: '600', fontSize: 16 },
  noButton: {
    backgroundColor: 'transparent',
    borderColor: '#E07B39',
    borderWidth: 2,
    paddingVertical: 6,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  noText: { color: '#E07B39', fontWeight: '600', fontSize: 16 },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#E07B39',
    marginTop: -2,
  },
});