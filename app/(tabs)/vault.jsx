import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';

// const QUICK_DOCS = [
//   { id: 'q1', name: 'Gas Bill' },
//   { id: 'q2', name: 'Lease Agreement' },
//   { id: 'q3', name: 'Electric Bill' },
//   { id: 'q4', name: 'Bank Statement' },
// ];

// For bundled images, set `image` to a require(). For uploaded files, `uri` is set instead.
// const INITIAL_DOCUMENTS = [
//   {
//     id: '1',
//     name: 'Passport',
//     date: 'February 18, 2026',
//     image: require('../../assets/placeholder-passport.png'),
//     uri: null,
//   },
//   {
//     id: '2',
//     name: 'Mortgage Bill',
//     date: 'January 27, 2026',
//     image: null,
//     uri: null,
//   },
// ];

export default function Vault() {
  const [documents, setDocuments] = useState([]);
  const [preview, setPreview] = useState(null);       // { source, name }
  const [pending, setPending] = useState(null);        // picked asset waiting for a name
  const [docName, setDocName] = useState('');

  // ── Upload: pick file then prompt for document type ────────────────────────
  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*', copyToCacheDirectory: true });
    if (!result.canceled) {
      setPending(result.assets[0]);
      setDocName('');
    }
  };

  const confirmUpload = () => {
    if (!docName.trim()) {
      Alert.alert('Name required', 'Please enter a document type.');
      return;
    }
    setDocuments(prev => [
      {
        id: Date.now().toString(),
        name: docName.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        image: null,
        uri: pending.uri,
      },
      ...prev,
    ]);
    setPending(null);
    setDocName('');
  };

  // ── View document ──────────────────────────────────────────────────────────
  const handleView = (doc) => {
    const source = doc.image ?? (doc.uri ? { uri: doc.uri } : null);
    if (!source) {
      Alert.alert('No file', 'No file is attached to this document yet.');
      return;
    }
    setPreview({ source, name: doc.name });
  };

  const hasFile = (doc) => !!(doc.image || doc.uri);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Document naming modal ────────────────────────────────────── */}
      <Modal
        visible={!!pending}
        transparent
        animationType="fade"
        onRequestClose={() => setPending(null)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPending(null)} />
          <View style={styles.namingCard}>
            <Text style={styles.namingTitle}>What type of document is this?</Text>
            <TextInput
              style={styles.namingInput}
              placeholder="e.g. Gas Bill, Lease Agreement…"
              placeholderTextColor="#aaa"
              value={docName}
              onChangeText={setDocName}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={confirmUpload}
            />
            <View style={styles.namingActions}>
              <TouchableOpacity style={styles.namingCancel} onPress={() => setPending(null)}>
                <Text style={styles.namingCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.namingConfirm} onPress={confirmUpload}>
                <Text style={styles.namingConfirmText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── Image preview modal ───────────────────────────────────────── */}
      <Modal
        visible={!!preview}
        transparent
        animationType="fade"
        onRequestClose={() => setPreview(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setPreview(null)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{preview?.name}</Text>
              <TouchableOpacity onPress={() => setPreview(null)}>
                <Ionicons name="close" size={22} color="#555" />
              </TouchableOpacity>
            </View>
            {preview && (
              <Image
                source={preview.source}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Intro text ──────────────────────────────────────────────── */}
        <View style={styles.introRow}>
          <Text style={styles.introText}>
            Store and access your personal documents anytime to establish proof-of-residency.
          </Text>
          <TouchableOpacity
            style={styles.helpBtn}
            onPress={() =>
              Alert.alert(
                'Why These Documents Matter',
                'If you encounter Immigration and Customs Enforcement (ICE), having certain documents available can be helpful—but it’s important to understand their limits.\n\n • They can help establish your identity, address, and ties to a local community.\n\n • Documents like utility bills, lease agreements, and bank statements show where you live, but do not prove lawful immigration status.\n\n • Having them on hand may help reduce confusion or misidentification if officers are verifying your information.\n\n • You are not required to hand over your phone, but you can choose to show documents on screen without giving them control of the device.\n\n • You have the right to remain silent and to ask for a lawyer before answering questions or providing documents.',
                [{ text: 'Got it' }],
              )
            }
            activeOpacity={0.7}
          >
            <Text style={styles.helpBtnText}>?</Text>
          </TouchableOpacity>
        </View>

        {/* ── How to store instructions ────────────────────────────────── */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsHeading}>How to store your documents</Text>
          {[
            { icon: 'scan-outline',         text: 'Capture the full document — all four corners must be visible.' },
            { icon: 'text-outline',         text: 'Make sure all text is sharp and legible, including names, dates, and addresses.' },
            { icon: 'sunny-outline',        text: 'Use good lighting — avoid shadows, glare, or low-light blur.' },
            { icon: 'checkmark-circle-outline', text: 'Double-check that no important information is cropped out before saving.' },
          ].map(({ icon, text }, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name={icon} size={18} color="#B89A72" style={styles.tipIcon} />
              <Text style={styles.tipText}>{text}</Text>
            </View>
          ))}
        </View>

        {/* ── Vault header ─────────────────────────────────────────────── */}
        <View style={styles.vaultHeadRow}>
          <Ionicons name="lock-closed-outline" size={26} color="#B89A72" />
          <Text style={styles.vaultHeadText}>Document Vault</Text>
        </View>
        <Text style={styles.vaultSubhead}>Your Documents</Text>

        {/* ── Upload button ─────────────────────────────────────────────── */}
        <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload} activeOpacity={0.8}>
          <Ionicons name="cloud-upload-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.uploadBtnText}>Upload Document</Text>
        </TouchableOpacity>

        {/* ── Document list ─────────────────────────────────────────────── */}
        <View style={styles.docList}>
          {documents.filter(hasFile).map((doc) => (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docInfo}>
                <Text style={styles.docName}>{doc.name}</Text>
                <Text style={styles.docDate}>{doc.date}</Text>
              </View>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleView(doc)}
                activeOpacity={0.7}
              >
                <Ionicons name="eye-outline" size={15} color="#444" style={{ marginRight: 4 }} />
                <Text style={styles.actionBtnText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_BG = '#F5E2C8';
const BG = '#FFF8F0';
const ORANGE = '#E07B39';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  container: { flex: 1, backgroundColor: BG },
  contentContainer: { paddingHorizontal: 20, paddingTop: 16 },

  // Naming modal
  namingCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    width: '100%',
    gap: 16,
  },
  namingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1A0E',
    textAlign: 'center',
  },
  namingInput: {
    borderWidth: 1,
    borderColor: '#E8D8C4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#2C1A0E',
    backgroundColor: '#FFF8F0',
  },
  namingActions: {
    flexDirection: 'row',
    gap: 10,
  },
  namingCancel: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
  },
  namingCancelText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  namingConfirm: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: '#E07B39',
    alignItems: 'center',
  },
  namingConfirmText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },

  // Tips card
  tipsCard: {
    backgroundColor: '#F5E2C8',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    gap: 12,
  },
  tipsHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C1A0E',
    marginBottom: 2,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  tipIcon: {
    marginTop: 1,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#5A3E28',
    lineHeight: 19,
  },

  // Image preview modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    width: '100%',
    maxHeight: '85%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1A0E',
  },
  modalImage: {
    width: '100%',
    height: 480,
  },

  // Intro
  introRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 8,
    paddingLeft: 12,
  },
  introText: {
    flex: 1,
    fontSize: 13.5,
    color: '#555',
    lineHeight: 20,
    textAlign: 'center',
  },
  helpBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#B89A72',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  helpBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B89A72',
    lineHeight: 14,
  },

  // Quick-access card
  quickCard: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 24,
  },
  quickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  quickRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D4B896',
  },
  quickRowText: {
    fontSize: 15,
    color: '#2C1A0E',
    fontWeight: '500',
  },

  // Vault header
  vaultHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  vaultHeadText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C1A0E',
  },
  vaultSubhead: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
    marginLeft: 2,
  },

  // Upload button
  uploadBtn: {
    flexDirection: 'row',
    backgroundColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  // Document list
  docList: { gap: 12 },
  docCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8D8C4',
    padding: 16,
    gap: 10,
  },
  docInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C1A0E',
  },
  docDate: {
    fontSize: 12,
    color: '#999',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'stretch',
  },
  actionBtnText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
});
