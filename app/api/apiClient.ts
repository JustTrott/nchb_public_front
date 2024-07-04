import axios from "axios";

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const fetchStandings = async (league: string) => {
	console.log(process.env.NEXT_PUBLIC_API_URL);
	const response = await apiClient.get("/standings/league/" + league);
	return response.data;
};

export const fetchBattles = async () => {
	const response = await apiClient.get("/battles/");
	return response.data;
};

export const submitBattle = async (battle: any) => {
	const response = await apiClient.put(`/battles/${battle._id}`, {
		points: battle.points,
	});
	battle.teams.forEach(async (team: any) => {
		await apiClient.put("/standings/" + team._id + "/buhgolts");
	});
	return response.data;
};

export const reset = async () => {
	const response = await apiClient.post("/reset");
	return response.data;
};

export const startTour = async (league: string) => {
	const response = await apiClient.post(`/standings/league/${league}/start`);
	await apiClient.post("/battles/arrange", {
		league,
		tour: response.data,
	});
};
// export const handleChange = async (selectedOption: any) => {
// 	try {
// 		const data = await fetchStandings(selectedOption.value);
// 		setStandings(data);
// 	} catch (error) {
// 		console.error('Error fetching league data:', error);
// 	}
// };
