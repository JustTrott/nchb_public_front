"use client";
import Select from "react-select";
import { History } from "@/components/history";
import { fetchBattles } from "../api/apiClient";
import { useEffect, useState } from "react";

export default function Home() {
	const [battles, setBattles] = useState([]);
	const [league, setLeague] = useState("senior");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBattles().then((data) => {
			setBattles(data);
			setLoading(false);
			console.log(data);
		});
	}, []);

	const options = [
		{ value: "senior", label: "Senior" },
		{ value: "junior", label: "Junior" },
	];

	const handleChange = async (selectedOption: any) => {
		console.log(`Option selected:`, selectedOption);
		try {
			setLeague(selectedOption.value);
			console.log("Everything works: ", selectedOption.value);
		} catch (error) {
			console.error("Error fetching league data:", error);
		}
	};
	return (
		<main className="flex min-h-screen flex-col items-center">
			<div className="mb-6">
				<Select options={options} onChange={handleChange} />
			</div>
			<History
				battles={battles}
				setBattles={setBattles}
				loading={loading}
				league={league}
			/>
		</main>
	);
}
