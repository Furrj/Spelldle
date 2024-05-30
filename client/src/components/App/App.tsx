import { useState } from "react";
import styles from "./App.module.scss";
import TurnBox from "../TurnBox/TurnBox";
import {
	initValidateSessionResult,
	T_SPELL_INFO,
	type T_VALIDATE_SESSION_RESULT,
} from "../../types";
import * as methods from "../../utils/methods";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { T_ALL_USER_DATA, initAllUserData } from "../../types";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { requestValidateSession } from "../../utils/requests";

const App: React.FC = () => {
	const [userData, setUserData] = useState<T_ALL_USER_DATA>(
		methods.deepCopyObject(initAllUserData)
	);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [allCurrentGuessInfo, setAllCurrentGuessInfo] = useState<T_SPELL_INFO>(
		methods.createNewSpellInfoMap()
	);

	const { isPending, error, data } = useQuery({
		queryKey: ["userData"],
		queryFn: () => {
			console.log("RUNNING QUERYFN");
			try {
				if (methods.isSessionIdInLocalStorage()) {
					console.log("SESSION DATA NOT FOUND");
					return;
				}

				requestValidateSession(methods.getUserSessionDataFromStorage());
			} catch (e: any) {
				if (e instanceof Error) {
					console.log(`ERROR: ${e.message}`);
				}
			}
		},
		enabled: methods.isSessionIdInLocalStorage(),
	});

	if (isPending) console.log("PENDING...");
	else if (error) console.log(`ERROR: ${error.message}`);
	else console.log(data);

	return (
		<div className={styles.root}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Navbar isLoggedIn={isLoggedIn} />
			<Routes>
				<Route
					path="/game"
					element={
						<TurnBox
							allCurrentGuessInfo={allCurrentGuessInfo}
							setAllCurrentGuessInfo={setAllCurrentGuessInfo}
						/>
					}
				/>
				<Route
					path="/register"
					element={
						<Register setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} />
					}
				/>
				<Route
					path="/login"
					element={
						<Login setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} />
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
