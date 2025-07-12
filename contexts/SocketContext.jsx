"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { io } from "socket.io-client"

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
        auth: {
          userId: user._id,
        },
      })

      newSocket.on("connect", () => {
        console.log("Connected to socket server")
      })

      newSocket.on("disconnect", () => {
        console.log("Disconnected from socket server")
      })

      setSocket(newSocket)

      return () => {
        newSocket.close()
      }
    }
  }, [user])

  const value = {
    socket,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
