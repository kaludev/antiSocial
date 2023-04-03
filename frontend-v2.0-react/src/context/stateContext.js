import {createContext, useContext, useEffect, useState} from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

const StateContext = createContext();

export default function ContextProvider({children}) {

    const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
    const [socket,setSocket] = useState(null);
	
	const searchParams = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();

	async function ShowMe() {
		try {
			setLoading(true);
			const res = await fetch(`/api/users/showme`);
			const json = await res.json();
			if(!json.ok) throw new Error(json.message);
			setUser(json.user);
			setTimeout(() => {
				setLoading(false);
				let route = searchParams[0].get("route");
				if(route)
					navigate(route);
				else
					navigate("/")
			}, 0.5* 1000);
		} catch (error) {
			console.error(error);
			setTimeout(() => {
				setLoading(false);
				navigate("/login");
			}, 0.5* 1000);
		}
	}

	useEffect(() => {
		if(user || location.pathname === "/login" || location.pathname === "/register") return;
		ShowMe()
	}, [location.pathname]);

    return (
        <StateContext.Provider
			value={{
				loading,setLoading,
				user, setUser,
				socket,setSocket
			}}
		>

			{loading?<></>:children}
		</StateContext.Provider>
    )
}

export function useStateContext() {
	return useContext(StateContext)
}
