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
	try {
		const contributions_2_months = fetch(endpoint)
			.then((events) => events.json())
			.then((events_json) => events_json.filter((e) => {
				const eventDate = new Date(e.created_at);
				return eventDate >= twoMonthsAgo && e.type === "PushEvent";
			}));

		const thisMonth = contributions_2_months.then(
			(events) => events.filter((e) => {
			const eventDate = new Date(e.created_at);
			return eventDate >= oneMonthAgo && e.type === "PushEvent";
		}));

		const lastMonth = contributions_2_months.then(
			(events) => events.filter((e) => {
			const eventDate = new Date(e.created_at);
			return eventDate < oneMonthAgo && eventDate >= twoMonthsAgo && e.type === "PushEvent";
		}));

		return { thisYear: thisMonth, lastYear: lastMonth};
	} catch (error) {
		const thisMonth = [], lastMonth = [];
		console.error(error);
		return { thisYear: thisMonth, lastYear: lastMonth};
	}

}