
export async function getContributions(username: string): Promise<number>{
	const now = new Date();
	//Format dates: YYYY-MM-DD
	const nowFomatted = now.toISOString().split('T')[0];

	//Have to do it in place? ...:(
	now.setFullYear(now.getFullYear()-1);
	const lastYearFormatted = now.toISOString().split('T')[0];
	const contributions = await fetch(`https://github-contributions-api.deno.dev/${username}.json?from=${lastYearFormatted}&to=${nowFomatted}`);
	const data = await contributions.json();
	return data["totalContributions"];
}

