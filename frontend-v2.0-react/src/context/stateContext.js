import {createContext, useContext, useEffect, useState} from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

const StateContext = createContext();

export default function ContextProvider({children}) {

    const [user, setUser] = useState(null);
    const [socket,setSocket] = useState(null);
    return (
        <StateContext.Provider
			value={{
				user, setUser,
				socket,setSocket
			}}
		>
			{children}
		</StateContext.Provider>
    )
}

export function useStateContext() {
	return useContext(StateContext)
}
