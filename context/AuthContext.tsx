import { auth } from "@/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import {
  createContext,
  ReactNode,
  use,
  useContext,
  useEffect,
  useState
} from "react"

type AuthContextType = { user: User | null; loading: boolean; refreshUser: () => Promise<void> }
const AUthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null)
      setLoading(false)
    })
    return unsubcribe
  }, [])

  const refreshUser = async () => {
    try {
      if (auth.currentUser) {
        await auth.currentUser.reload()
        // After reload, auth.currentUser has fresh profile fields
        setUser(auth.currentUser)
      }
    } catch (e) {
      // no-op; keep prior state
      console.warn('refreshUser failed', e)
    }
  }

  return (
    <AUthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AUthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AUthContext)
}
