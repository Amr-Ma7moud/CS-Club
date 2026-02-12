import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Course, TeamMember, SiteSettings } from "@/types";

// ─── Courses ──────────────────────────────────────────────

const coursesCol = collection(db, "courses");

export async function getCourses(): Promise<Course[]> {
  const snap = await getDocs(query(coursesCol, orderBy("year", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Course);
}

export async function getCourseBySlug(
  slug: string
): Promise<Course | undefined> {
  const q = query(coursesCol, where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return undefined;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Course;
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const d = await getDoc(doc(db, "courses", id));
  if (!d.exists()) return undefined;
  return { id: d.id, ...d.data() } as Course;
}

export async function addCourse(
  data: Omit<Course, "id">
): Promise<string> {
  const docRef = await addDoc(coursesCol, data);
  return docRef.id;
}

export async function updateCourse(
  id: string,
  data: Partial<Omit<Course, "id">>
): Promise<void> {
  await updateDoc(doc(db, "courses", id), data);
}

export async function deleteCourse(id: string): Promise<void> {
  await deleteDoc(doc(db, "courses", id));
}

// ─── Team Members ─────────────────────────────────────────

const teamCol = collection(db, "teamMembers");

export async function getTeamMembers(): Promise<TeamMember[]> {
  const snap = await getDocs(query(teamCol, orderBy("order", "asc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as TeamMember);
}

export async function getTeamMemberById(
  id: string
): Promise<TeamMember | undefined> {
  const d = await getDoc(doc(db, "teamMembers", id));
  if (!d.exists()) return undefined;
  return { id: d.id, ...d.data() } as TeamMember;
}

export async function addTeamMember(
  data: Omit<TeamMember, "id">
): Promise<string> {
  const docRef = await addDoc(teamCol, data);
  return docRef.id;
}

export async function updateTeamMember(
  id: string,
  data: Partial<Omit<TeamMember, "id">>
): Promise<void> {
  await updateDoc(doc(db, "teamMembers", id), data);
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, "teamMembers", id));
}

// ─── Site Settings ────────────────────────────────────────

const SETTINGS_DOC = doc(db, "siteSettings", "main");

const defaultSettings: SiteSettings = {
  email: "",
  github: "",
  discord: "",
  linkedin: "",
  twitter: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const d = await getDoc(SETTINGS_DOC);
  if (!d.exists()) return defaultSettings;
  return { ...defaultSettings, ...d.data() } as SiteSettings;
}

export async function updateSiteSettings(
  data: Partial<SiteSettings>
): Promise<void> {
  await setDoc(SETTINGS_DOC, data, { merge: true });
}
