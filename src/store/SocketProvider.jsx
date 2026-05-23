import React, { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({ socket: null });

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const s = io(url, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    socketRef.current = s;
    setSocket(s);

    return () => {
      s.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
