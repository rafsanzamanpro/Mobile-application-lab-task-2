import { StyleSheet, View } from "react-native";
import AddStudentForm from "../../components/add-student-form";

export default function AddStudentScreen() {
  return (
    <View style={styles.screen}>
      <AddStudentForm />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
});