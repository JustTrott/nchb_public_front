/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/x1cdMm7ZGU5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitBattle, startTour, reset } from "@/app/api/apiClient";
import { toast } from "react-toastify";

export function History({
	battles,
	setBattles,
	loading,
	league,
}: {
	battles: any[];
	setBattles: (battles: any) => void;
	loading: boolean;
	league: string;
}) {
	if (loading) {
		return <div>Loading...</div>;
	}

	const handleChange = (battleId: string, teamIndex: number, val: string) => {
		setBattles((prevBattles: any) =>
			prevBattles.map((battle: any) =>
				battle._id === battleId
					? {
							...battle,
							points: battle.points.map(
								(point: number, index: number) =>
									index === teamIndex ? Number(val) : point
							),
					  }
					: battle
			)
		);
	};

	const handleSubmit = async (battle: any) => {
		await submitBattle(battle);
		toast("Submitted");
	};

	const handleStart = async (league: string) => {
		await startTour(league);
		toast("Started New Tour. Please reload");
	};

	const handleReset = async () => {
		await reset();
		toast("Reset");
	};
	const filteredBattles = battles.filter(
		(battle) => battle.teams[0].league === league
	);
	// get battles that have highest .tour value
	const highestTour =
		Math.max(
			...battles.map((battle) =>
				battle.teams[0].league === league ? battle.tour : 0
			)
		) || 0;
	console.log(highestTour);
	const activeBattles = filteredBattles.filter(
		(battle) => battle.tour === highestTour
	);
	console.log(battles, activeBattles);
	const pastBattles = filteredBattles.filter(
		(battle) => battle.tour < highestTour
	);
	return (
		<div className="bg-background rounded-lg border p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-bold">Active Battles</h2>
				<div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
					{activeBattles.map((battle) => (
						<div
							className="bg-card rounded-lg p-4 flex flex-col gap-2"
							key={battle._id}
						>
							<div className="flex items-center justify-between">
								<span className="text-card-foreground font-medium">
									{battle.teams[0].name}
								</span>
								<div className="flex items-center gap-2">
									<Input
										type="number"
										className="w-20 text-right"
										value={battle.points[0]}
										onChange={(e) =>
											handleChange(
												battle._id,
												0,
												e.target.value
											)
										}
									/>
									<Button
										onClick={() => handleSubmit(battle)}
									>
										Submit
									</Button>
								</div>
							</div>
							{battle.teams[1] ? (
								<div className="flex items-center justify-between">
									<span className="text-card-foreground font-medium">
										{battle.teams[1].name}
									</span>
									<div className="flex items-center gap-2">
										<Input
											type="number"
											className="w-20 text-right"
											value={battle.points[1]}
											onChange={(e) =>
												handleChange(
													battle._id,
													1,
													e.target.value
												)
											}
										/>
										<Button
											onClick={() => handleSubmit(battle)}
										>
											Submit
										</Button>
									</div>
								</div>
							) : (
								<div className="flex items-center justify-between gap-1">
									<span className="text-card-foreground font-medium">
										Specific teams:{" "}
										{battle.jury.specificTeams
											.map((team: any) => team.name)
											.join(", ")}
									</span>
									<div className="flex items-center gap-2">
										<span className="text-card-foreground">
											-
										</span>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-bold">Past Battles</h2>
				<div className="flex flex-col gap-4 md:grid md:grid-cols-3">
					{pastBattles.map((battle) => (
						<div
							className="bg-card rounded-lg p-4 flex flex-col gap-2"
							key={battle._id}
						>
							<div className="flex items-center justify-between">
								<span className="text-card-foreground font-medium">
									{battle.teams[0].name}
								</span>
								<div className="flex items-center gap-2">
									<Input
										type="number"
										className="w-20 text-right"
										value={battle.points[0]}
										onChange={(e) =>
											handleChange(
												battle._id,
												0,
												e.target.value
											)
										}
									/>

									<Button
										onClick={() => handleSubmit(battle)}
									>
										Submit
									</Button>
								</div>
							</div>
							{battle.teams[1] ? (
								<div className="flex items-center justify-between">
									<span className="text-card-foreground font-medium">
										{battle.teams[1].name}
									</span>
									<div className="flex items-center gap-2">
										<Input
											type="number"
											className="w-20 text-right"
											value={battle.points[1]}
											onChange={(e) =>
												handleChange(
													battle._id,
													1,
													e.target.value
												)
											}
										/>
										<Button
											onClick={() => handleSubmit(battle)}
										>
											Submit
										</Button>
									</div>
								</div>
							) : (
								<div className="flex items-center justify-between gap-1">
									<span className="text-card-foreground font-medium">
										Specific teams:{" "}
										{battle.jury.specificTeams
											.map((team: any) => team.name)
											.join(", ")}
									</span>
									<div className="flex items-center gap-2">
										<span className="text-card-foreground">
											-
										</span>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<Button className="w-full" onClick={() => handleStart(league)}>
				Start New Tour
			</Button>
			<Button
				onClick={handleReset}
				className="
                bg-red-500
                hover:bg-red-600
                text-white
                w-full
            "
			>
				Reset
			</Button>
		</div>
	);
}
