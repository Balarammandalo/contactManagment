import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        checkUserLoggedIn()   
    },[])
    //check user loggin 
    const checkUserLoggedIn = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");
    
            const result = await axios.get("http://localhost:3000/api/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!result.error) {
                setUser(result);
                navigate("/", { replace: true });
            }
            else {
                navigate("/login", {reaplace: true})
            }
        } 
        catch (err) {
            console.log(err)
        }
    };

    //user login
    const loginUser = async (userData) => {
      try {
        const res = await fetch(`http://localhost:3000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
        })
          const result = await res.json();
          if (!result.error) {
              localStorage.setItem("token" , result.getToken)
              setUser(result.user)
              toast.success(`Logged in ${result.user.name}`);
              navigate("/", { replace: true });
          }
          else {
            toast.error(result.error);
          }
      }
      catch (err) {
            console.log(err);
        }
    };

    //user register
    const registerUser = async (userData) => {
        try {
            const res = await fetch(`http://localhost:3000/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userData }),
            })

            const result = await res.json()
            if (!result.error) {
                toast.success(result.success);
                navigate("/login", { replace: true });
            } else {
                toast.error(result.error)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    
    return (
        <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;




        
