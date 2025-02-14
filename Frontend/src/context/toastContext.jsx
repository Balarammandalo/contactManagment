import { createContext } from "react";
import { ToastContainer,toast } from "react-toastify";

const ToastContext = createContext()

export const ToastContextProvider = ({children}) => {
    return (
        <ToastContext.Provider value={{ toast }}>
            <ToastContainer autoClose={2000} />
                {children}
    </ToastContext.Provider>
    )
}

export default ToastContext