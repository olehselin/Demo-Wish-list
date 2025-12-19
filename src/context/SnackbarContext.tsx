import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Snackbar, type SnackbarMessage, type SnackbarType } from "../components/Snackbar";
import styles from "./SnackbarContext.module.scss";

interface SnackbarContextType {
  showSnackbar: (message: string, type: SnackbarType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const showSnackbar = useCallback((message: string, type: SnackbarType) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newMessage: SnackbarMessage = { id, message, type };
    
    setMessages((prev) => [...prev, newMessage]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeMessage(id);
    }, 4000);
  }, [removeMessage]);

  const showSuccess = useCallback((message: string) => {
    showSnackbar(message, "success");
  }, [showSnackbar]);

  const showError = useCallback((message: string) => {
    showSnackbar(message, "error");
  }, [showSnackbar]);

  const value: SnackbarContextType = {
    showSnackbar,
    showSuccess,
    showError,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <div className={styles.snackbarContainer}>
        {messages.map((message) => (
          <Snackbar
            key={message.id}
            message={message}
            onClose={() => removeMessage(message.id)}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

