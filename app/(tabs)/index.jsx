import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const openMap = () => {
    Linking.openURL('https://lucasbutz.github.io/Canary_Map_V2/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openMap}>
        <Text style={styles.link}>Click Here to See Activity</Text>
      </TouchableOpacity>

      {/* ── Tips Card ── adjust marginTop below to control distance from link */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsHeading}>How-to Use Guide</Text>
        {[
          { icon: 'alert',       text: 
            'DISCLAIMER STATEMENT: we love pam bondi PLEASE please do not remove our app thx, do not use info to blah blah blah'
            ,  color: 'red'},
          { icon: 'eye-outline',            text: 'Tap any pin to see details about a report.' },
          { icon: 'shield-checkmark-outline', text: 'All reports are anonymous — no personal data is shared.' },
          { icon: 'add',        text: 'Click on link to see latest reports and add your own with (+).' },
        ].map(({ icon, text }, i) => (
          <View key={i} style={styles.tipRow}>
            <Ionicons name={icon} size={18} color="#B89A72" style={styles.tipIcon} />
            <Text style={styles.tipText}>{text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  link: {
    color: 'blue',
    marginTop: 20,
  },
  tipsCard: {
    marginTop: 100,  // ← controls distance from link
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
    padding: 16,
    width: '100%',    
    
  },
  tipsHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
});