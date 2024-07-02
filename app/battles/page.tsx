"use client";
import { History } from "@/components/history";
import { fetchBattles } from "../api/apiClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { reset } from "../api/apiClient";

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
			{/* red reset button */}
			<Button
				onClick={reset}
				className="
                bg-red-500
                hover:bg-red-600
                text-white
                font-bold
                py-2
                px-4
                rounded
            "
			>
				Reset
			</Button>
		</main>
	);
}
