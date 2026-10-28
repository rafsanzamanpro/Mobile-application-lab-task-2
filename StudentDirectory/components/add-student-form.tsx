import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import FormField from "./form-field";
import { Student } from "../data/students";
import { useStudents } from "../context/students-context";

interface FormData { name: string; studentID: string; department: string; bio: string; skillsText: string; }
interface FormErrors { name?: string; studentID?: string; department?: string; bio?: string; }

function validateForm(data: FormData, currentStudents: Student[]): FormErrors {
  const newErrors: FormErrors = {};
  
  if (data.name.trim().length === 0) newErrors.name = "Name is required.";
  else if (data.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";

  const idPattern = /^\d{2}-\d{5}-\d$/;
  if (data.studentID.trim().length === 0) newErrors.studentID = "Student ID is required.";
  else if (!idPattern.test(data.studentID.trim())) newErrors.studentID = "Format must be NN-NNNNN-N.";
  else if (currentStudents.some((s) => s.studentId === data.studentID.trim())) {
    newErrors.studentID = "Student ID already exists"; // FEATURE 3
  }

  if (data.department.trim().length === 0) newErrors.department = "Department is required.";
  if (data.bio.trim().length === 0) newErrors.bio = "Bio is required.";
  else if (data.bio.trim().length < 10) newErrors.bio = "Bio must be at least 10 characters.";

  return newErrors;
}

export default function AddStudentForm() {
  const { students, dispatch } = useStudents();
  const [formData, setFormData] = useState<FormData>({ name: "", studentID: "", department: "", bio: "", skillsText: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    const newErrors = validateForm(formData, students);
    setErrors(newErrors);
  }, [formData, students]);

  const isFormValid = Object.keys(errors).length === 0 && formData.name.length > 0 && formData.studentID.length > 0;
  const getFieldError = (field: keyof FormErrors) => (touched[field] || submitAttempted) ? errors[field] : undefined;

  const handleSubmit = () => {
    setTouched({ name: true, studentID: true, department: true, bio: true });
    setSubmitAttempted(true);

    if (isFormValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        const newStudent: Student = {
          id: Date.now().toString(),
          name: formData.name.trim(),
          studentId: formData.studentID.trim(),
          department: formData.department.trim(),
          bio: formData.bio.trim(),
          skills: formData.skillsText.split(",").map(s => s.trim()).filter(Boolean),
          avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
        };
        dispatch({ type: "ADD_STUDENT", payload: newStudent });
        setIsSubmitting(false);
        router.back();
      }, 1500);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <FormField label="Full Name" value={formData.name} onChangeText={(t) => updateField("name", t)} onBlur={() => markTouched("name")} error={getFieldError("name")} placeholder="e.g. Ashraful Haque" />
      <FormField label="Student ID" value={formData.studentID} onChangeText={(t) => updateField("studentID", t)} onBlur={() => markTouched("studentID")} error={getFieldError("studentID")} placeholder="22-12345-1" autoCapitalize="none" />
      <FormField label="Department" value={formData.department} onChangeText={(t) => updateField("department", t)} onBlur={() => markTouched("department")} error={getFieldError("department")} placeholder="Computer Science" />
      <FormField label="Bio" value={formData.bio} onChangeText={(t) => updateField("bio", t)} onBlur={() => markTouched("bio")} error={getFieldError("bio")} placeholder="Short bio..." multiline />
      <FormField label="Skills (comma separated)" value={formData.skillsText} onChangeText={(t) => updateField("skillsText", t)} placeholder="React, Node.js" autoCapitalize="none" />

      <Pressable style={[styles.button, !isFormValid && styles.buttonDisabled]} onPress={handleSubmit} disabled={!isFormValid || isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Join Directory</Text>}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  button: { backgroundColor: "#0D9488", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 8 },
  buttonDisabled: { backgroundColor: "#CBD5E1" },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});