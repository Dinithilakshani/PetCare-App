export interface Task {
  id?: string
  title: string
  description: string
  // Unix epoch milliseconds for when the task is due (optional)
  dueDate?: number
  // Whether a local notification should be scheduled for this task
  notify?: boolean
  // ID returned by the notification scheduler so we can cancel/update
  notificationId?: string
}
