import { router } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useStudents } from "../../context/students-context";
import { Student } from "../../data/students";
import SearchBar from "../../components/search-bar";
import StudentItem from "../../components/student-item";
import StudentDetail from "../../components/student-detail";

export default function Index() {
  const { students, dispatch } = useStudents(); // Global state
  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.department.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (student: Student) => {
    setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
  };

  const resetStudents = () => {
    dispatch({ type: "RESET" });
    setQuery("");
    setSelectedStudent(null);
  };

  const handleReset = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Restore original student list?")) {
        resetStudents();
      }
      return;
    }

    Alert.alert("Reset Directory", "Restore original student list?", [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: resetStudents },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleBar}>
        {/* FEATURE 2: Live Student Count */}
        <Text style={styles.title} numberOfLines={1}>
          Student Directory ({students.length})
        </Text>
        
        <View style={styles.buttonRow}>
          <Pressable 
            style={({ pressed }) => [
              styles.headerBtn, 
              { opacity: pressed ? 0.6 : 1 }
            ]} 
            onPress={handleReset}
            hitSlop={15}
          >
            <Text style={styles.headerBtnText}>Reset</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.headerBtn, 
              { opacity: pressed ? 0.6 : 1 }
            ]} 
            onPress={() => router.push("/(tabs)/add-student")}
            hitSlop={15}
          >
            <Text style={styles.headerBtnText}>+ Add</Text>
          </Pressable>
        </View>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem student={item} onPress={handleSelect} isSelected={selectedStudent?.id === item.id} />
        )}
        ListEmptyComponent={<View style={styles.empty}><Text>No students found</Text></View>}
      />
      
      {selectedStudent && <StudentDetail student={selectedStudent} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  titleBar: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    backgroundColor: "#0D1F4E",
    zIndex: 10, 
    elevation: 4, 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#FFFFFF",
    flex: 1, 
    marginRight: 10,
  },
  buttonRow: { 
    flexDirection: "row", 
    gap: 8,
    zIndex: 20, 
  },
  headerBtn: { 
    backgroundColor: "#0D9488", 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8 
  },
  headerBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12 },
  empty: { padding: 40, alignItems: "center" },
});