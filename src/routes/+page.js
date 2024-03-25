import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	// Set the GitHub API endpoint
	const username = 'akongstad';
	const endpoint = `https://api.github.com/users/${username}/events?per_page=100`;

	// Get the dates
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth(); // Months are zero-based
	const thisMonth = new Date(currentYear, currentMonth, 1);
	const lastMonth = new Date(currentYear, currentMonth - 1, 1);

	// Make the API request to get all events for the user
	const contributions_2_months = fetch(endpoint)
		.then(response => {
			if (!response.ok) {
				throw error(420, 'GitGub API limit exceeded');
			}
			return response.json();
		})
		.then(events_json => events_json.filter((/** @type {{ created_at: string | number | Date; type: string; }} */ e) => {
			const eventDate = new Date(e.created_at);
			return eventDate >= lastMonth && e.type === 'PushEvent';
		})).catch((error) => { // Catch the error if the API limit is exceeded
			{ console.log('Error: ', error); return []}
		});

	const contsThisMonth = contributions_2_months.then(
		(events) => events.filter((/** @type {{ created_at: string | number | Date; type: string; }} */ e) => {
			const eventDate = new Date(e.created_at);
			return eventDate >= thisMonth && e.type === 'PushEvent';
		}));

	const contsLastMonth = contributions_2_months.then(
		(events) => events.filter((/** @type {{ created_at: string | number | Date; type: string; }} */ e) => {
			const eventDate = new Date(e.created_at);
			return eventDate < thisMonth && eventDate >= lastMonth && e.type === 'PushEvent';
		}));

	return { thisMonth: contsThisMonth, lastMonth: contsLastMonth };
}
