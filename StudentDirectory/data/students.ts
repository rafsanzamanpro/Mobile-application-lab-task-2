export interface Student {
  id: string;
  name: string;
  studentId: string;
  department: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
}

export const STUDENTS: Student[] = [
  { id: "1", name: "Rakib Rahman", studentId: "22-12345-1", department: "Computer Science", bio: "Passionate about mobile development.", skills: ["React Native", "TypeScript"], avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Ayesha Rahman", studentId: "22-67890-2", department: "Computer Science", bio: "Interested in AI and full-stack web development.", skills: ["Python", "Machine Learning"], avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "3", name: "Tariq Hassan", studentId: "22-11111-3", department: "Software Engineering", bio: "Backend enthusiast with a love for system design.", skills: ["Java", "Spring Boot"], avatarUrl: "https://i.pravatar.cc/150?img=3" },
];