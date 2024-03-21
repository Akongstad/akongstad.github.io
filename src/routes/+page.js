/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

	// Set the GitHub API endpoint
	const username = "akongstad";
	const endpoint = `https://api.github.com/users/${username}/events?per_page=100`;

	// Get the dates
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth(); // Months are zero-based
	const oneMonthAgo = new Date(currentYear, currentMonth - 1, currentDate.getDate());
	const twoMonthsAgo = new Date(currentYear, currentMonth - 2, currentDate.getDate());

	// Make the API request to get all events for the user
	const events =await fetch(endpoint);

	// Filter response
	const events_json = await events.json();
	const thisMonth = events_json.filter(( /** @type {{ created_at: string | number | Date; type: string; }} */ e) => {
		const eventDate = new Date(e.created_at);
		return eventDate >= oneMonthAgo && e.type === "PushEvent";
	});

	const lastMonth = events_json.filter((/** @type {{ created_at: string | number | Date; type: string; }} */ e) => {
		const eventDate = new Date(e.created_at);
		return eventDate >= twoMonthsAgo && eventDate < oneMonthAgo && e.type === "PushEvent";
	});

	return { thisYear: thisMonth.length, lastYear: lastMonth.length};
}