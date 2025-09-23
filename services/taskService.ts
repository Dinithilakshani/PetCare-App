import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore"
import api from "./config/api"
import { Task } from "@/types/task"
import { db } from "@/firebase"

// for refer to collection
export const taskColRef = collection(db, "tasks")

// Utility: remove undefined values so Firestore doesn't error on write
const stripUndefined = <T extends Record<string, any>>(obj: T): T => {
  const entries = Object.entries(obj).filter(([, v]) => v !== undefined)
  return Object.fromEntries(entries) as T
}

// firebase firestore
export const createTask = async (task: Task) => {
  const cleanTask = stripUndefined(task)
  const docRef = await addDoc(taskColRef, cleanTask)
  return docRef.id
}

export const updateTask = async (id: string, task: Task) => {
  const docRef = doc(db, "tasks", id)
  const { id: _id, ...taskData } = task
  const cleanTaskData = stripUndefined(taskData)
  return await updateDoc(docRef, cleanTaskData)
}

export const deleteTask = async (id: string) => {
  const docRef = doc(db, "tasks", id)
  return await deleteDoc(docRef)
}

export const getAllTaskData = async () => {
  const snapshot = await getDocs(taskColRef)
  const taskList = snapshot.docs.map((taskRef) => ({
    id: taskRef.id,
    ...taskRef.data()
  })) as Task[]
  return taskList
}

export const getTaskById = async (id: string) => {
  const taskDocRef = doc(db, "tasks", id)
  const snapshot = await getDoc(taskDocRef)
  const task = snapshot.exists()
    ? ({ id: snapshot.id, ...snapshot.data() } as Task)
    : null
  return task
}

export const getAllTaskByUserId = async (userId: string) => {
  const q = query(taskColRef, where("userId", "==", userId))

  const querySnapshot = await getDocs(q)
  const taskList = querySnapshot.docs.map((taskRef) => ({
    id: taskRef.id,
    ...taskRef.data()
  })) as Task[]
  return taskList
}

// ================================================================
// axios with mock server api intrigation
export const getAllTask = async () => {
  const res = await api.get("/task")
  return res.data
}

export const addTask = async (task: any) => {
  const res = await api.post("/task", task)
  return res.data
}