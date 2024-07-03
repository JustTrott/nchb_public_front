"use client";
import { History } from "@/components/history";
import { fetchBattles } from "../api/apiClient";
import { useEffect, useState } from "react";

export default function Home() {
	const [battles, setBattles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBattles().then((data) => {
			setBattles(data);
			setLoading(false);
			console.log(data);
		});
	}, []);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<History
				battles={battles}
				setBattles={setBattles}
				loading={loading}
			/>
		</main>
	);
}
