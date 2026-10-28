import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Student } from "../data/students";
import { useStudents } from "../context/students-context";

export default function StudentDetail({ student }: { student: Student }) {
  const { dispatch } = useStudents();

  const handleRemove = () => {
    Alert.alert("Remove Student", `Remove ${student.name}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => dispatch({ type: "REMOVE_STUDENT", payload: student.id }) },
    ]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.department}>{student.department}</Text>
      <Text style={styles.idBadge}>ID: {student.studentId}</Text>
      <Text style={styles.bio}>{student.bio}</Text>
      <Pressable style={styles.removeButton} onPress={handleRemove}>
        <Text style={styles.removeText}>Remove from Directory</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 12, padding: 20, backgroundColor: "#FFFFFF", borderRadius: 14, elevation: 3 },
  name: { fontSize: 18, fontWeight: "bold", color: "#0D1F4E" },
  department: { fontSize: 13, color: "#0D9488", marginBottom: 6 },
  idBadge: { fontSize: 11, color: "#0D9488", backgroundColor: "#E1F5EE", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, marginBottom: 14 },
  bio: { fontSize: 13, color: "#64748B", marginBottom: 14 },
  removeButton: { marginTop: 10, paddingVertical: 10, alignItems: "center", borderRadius: 8, borderWidth: 1, borderColor: "#EF4444" },
  removeText: { color: "#EF4444", fontSize: 13, fontWeight: "600" },
});