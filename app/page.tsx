"use client";
import { Leaderboard } from "@/components/leaderboard";
import { ActiveHistory } from "@/components/activeHistory";
import { fetchStandings, fetchBattles } from "./api/apiClient";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function Home() {
	const [standings, setStandings] = useState([]);
	const [battles, setBattles] = useState([]);
	const [league, setLeague] = useState("senior");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchStandings("senior").then((data) => {
			setStandings(data);
			setLoading(false);
			console.log(data);
		});
		fetchBattles().then((data) => {
			setBattles(data);
		});
	}, []);
	const options = [
		{ value: "senior", label: "Senior" },
		{ value: "junior", label: "Junior" },
	];

	const handleChange = async (selectedOption: any) => {
		console.log(`Option selected:`, selectedOption);
		try {
			const standings = await fetchStandings(selectedOption.value);
			setStandings(standings);
			setLeague(selectedOption.value);
			console.log("Everything works: ", selectedOption.value);
		} catch (error) {
			console.error("Error fetching league data:", error);
		}
	};
	return (
		<main className="flex min-h-screen flex-col items-center">
			<div className="mt-6 ml-7 flex items-start w-full">
				<Select options={options} onChange={handleChange} />
			</div>
			<Leaderboard standings={standings} setStandings={setStandings} />
			<ActiveHistory
				loading={loading}
				battles={battles}
				league={league}
			/>
		</main>
	);
}
