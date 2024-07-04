"use client";
import { Leaderboard } from "@/components/leaderboard";
import { fetchStandings } from "./api/apiClient";
import { useEffect, useState } from "react";

export default function Home() {
	const [standings, setStandings] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		fetchStandings("senior").then((data) => {
			setStandings(data);
			setLoading(false);
			console.log(data);
		});
	}, []);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<Leaderboard standings={standings} />
		</main>
	);
}
