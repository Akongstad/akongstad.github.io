<!--Credits: UI components: ShadCn-->

<script lang="ts">
	import '../app.pcss';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onDestroy, onMount } from 'svelte';
	import { GithubLogo, EnvelopeClosed, Calendar, LinkedinLogo, ChevronDown } from 'svelte-radix';
	import { fade } from 'svelte/transition';
	import { Progress } from '$lib/components/ui/progress';
	import { tweened } from 'svelte/motion';
	import { cubicOut, linear } from 'svelte/easing';
	import { typewriter } from '$lib/custom-transitions.js';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Skeleton } from '$lib/components/ui/skeleton';

	let ready = false;
	let showBio = false;
	let showStats = false;


	/** @type {import('./$types').LayoutData} */

		// Education Progress
	let edStart = new Date(2020, 8, 1);
	let edEnd = new Date(2025, 6, 1);
	let now = new Date();
	let edProgress = (now.getTime() - edStart.getTime()) / (edEnd.getTime() - edStart.getTime()) * 100;
	let educationProgress = tweened(0, {
		duration: 500,
		easing: cubicOut
	});

	// Github Contributions
	let githubThisYear = tweened(0, {
		duration: 500,
		easing: linear
	});
	let githubLastYear = tweened(0, {
		duration: 1000,
		easing: linear
	});
	export let data;
	let diff = 0;


	onMount(async () => {
		ready = true;
		setTimeout(() => {
			showBio = true;
		}, 2000);

		let thisMonth = await data.thisMonth;
		let lastMonth = await data.lastMonth;
		diff = thisMonth.length - lastMonth.length;
		let diffPercent = (diff / lastMonth.length) * 100;
		showStats = true;
		educationProgress.set(edProgress);
		await githubThisYear.set(thisMonth.length);
		await githubLastYear.set(diffPercent);
	});
	onDestroy(() => {
		ready = false;
		showBio = false;
	});

	function scrollIntoView({ target}) {
		const el = document.querySelector(target.getAttribute('data-element'));
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}

</script>
<main>
	<div id="top" class="flex justify-center p-10">

		<Avatar.Root class="size-44 sm:size-44 md:size-60 max-w-96">
			<Avatar.Image src="https://github.com/Akongstad.png" alt="Andreas Kongstad" />
			<Avatar.Fallback>
				<Skeleton class="size-32 sm:size-44 md:size-60 rounded-full" />
			</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div class="flex justify-center">
		<div class="mb-1 md:px-20 px-5 text-center md:w-[900px] ">
			<Card.Root class=" p-4 bg-accent text-left min-h-56">
				<div class="flex items-center mb-1">
					<div class="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
					<div class="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
				</div>
				<Card.Header>
					<Card.Title>
						<code><span class="text-green-600">visitor@andreas-kongstad</span>:<span class="text-blue-500">/home/andreas$</span>
							{#if ready}<span transition:typewriter={{ speed: 1 }}> cat andreas_info.txt</span>{/if}
						</code>
					</Card.Title>
				</Card.Header>
				<Card.Content>
					{#if showBio}
						<code class="text-start font-mono" transition:typewriter={{ speed: 25 }}>Hello, my name is Andreas Kongstad,
							I am a MSc Computer Science Student @ ITU in Copenhagen who likes problem-solving and improving. I also
							enjoy coffee☕, running🏃, and many things tech🖥️.
						</code>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
	</div>


	<div class="flex justify-center ">
		<div class="grid gap-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 md:px-20 px-5 py-4 md:w-[1000px] w-[590px]"
				 transition:fade={{duration: 10}}>
			<Card.Root class="bg-accent">
				<Card.Header>
					<div class="flex flex-row items-center justify-between space-y-0">
						<Card.Title class="text-base font-medium">Education Progress | MSc Computer Science</Card.Title>
						<Calendar class="h-6 w-6 text-muted-foreground" />
					</div>
				</Card.Header>
				{#if showStats}
					<Card.Content>
						<Progress value={$educationProgress} />
						<div class="flex justify-between pt-2">
							<p class="text-sm text-muted-foreground">{edStart.toDateString()}</p>
							<p class="text-sm text-muted-foreground">{Math.round(edProgress)}%</p>
							<p class="text-sm text-muted-foreground">{edEnd.toDateString()}</p>
						</div>
					</Card.Content>
				{/if}
			</Card.Root>
			<Card.Root class="bg-accent">
				<div title="The total number of contributions made to public GitHub repositories in the past month">
					<Card.Header
						class="flex flex-row items-center justify-between space-y-0 pb-2"
					>
						<Card.Title class="text-base font-medium">Public Contributions (This month):</Card.Title>
						<GithubLogo class="h-6 w-6 text-muted-foreground" />
					</Card.Header>
					{#if showStats}
						<Card.Content>
							{#if $githubThisYear === 0}
								<p class="text-sm text-foreground">Github API rate limit reached. Come back later</p>
							{:else}
								<div class="text-2xl font-bold"
										 title="The total number of contributions made to public GitHub repositories in the past month">
									+{Math.round($githubThisYear)}</div>
							{/if}
							{#if diff > 0}
								<p class="text-sm text-muted-foreground"
									 title="the percentage increase or decrease in contributions compared to the last month.">
									+{Math.round($githubLastYear)}% from last month</p>
							{:else}
								<p class="text-sm text-muted-foreground"
									 title="the percentage increase or decrease in contributions compared to the month.">
									{Math.round($githubLastYear)}
									% from last month</p>
							{/if}
						</Card.Content>
					{/if}
				</div>
			</Card.Root>
		</div>
	</div>
	<div class=" text-center pt-6">
		<Button variant="ghost" size="icon" class="size-12">
			<a href="https://github.com/Akongstad" target="_blank" rel="noreferrer">
				<GithubLogo class="h-8 w-8 hover:text-purple-700" />
			</a>
		</Button>
		<Button variant="ghost" size="icon" class="size-12">
			<a href="https://www.linkedin.com/in/andreas-kongstad/" target="_blank" rel="noreferrer">
				<LinkedinLogo class="h-8 w-8 hover:text-blue-700" />
			</a>
		</Button>
		<Button variant="ghost" size="icon" class="size-12">
			<a href="mailto: akongstad.contact@icloud.com">
				<EnvelopeClosed class="h-8 w-8 hover:text-blue-700" />
			</a>
		</Button>
	</div>
	<div class="flex justify-center p-10">
		<Button variant="ghost" size="icon" class="size-12">
			<a href="#experience" on:click|preventDefault={scrollIntoView} data-element="#experience">
				<svg class="h-8 w-8 hover:text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						 stroke="currentColor" data-element="#experience">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							 d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
				</svg>
			</a>
		</Button>
	</div>

	<!--Vertical Line with rounded borders-->
	<div class="flex justify-center">
		<div class="w-2 h-56 bg-accent rounded-t-full" />
	</div>

	<section id="experience">
		<div class="flex justify-center">
		<div class="w-52 h-52 pt-20 rounded-full bg-accent mr-2">
			<h2 class="text-center text-3xl font-bold">Experience</h2>
		</div>
		</div>
	</section>

	<div class="flex justify-evenly">
		<div class="grid grid-rows-13 grid-flow-col gap-8">
			<div class="row-start-1 row-end-3 row-span flex col-span-2 justify-end">
				<Card.Root class="bg-accent">
					<Card.Header>
						<Card.Title>That time when i...</Card.Title>
					</Card.Header>
					<Card.Content>
						<p>Experience</p>
					</Card.Content>
				</Card.Root>
			</div>
<div class="row-start-5 row-end-7 col-span-2 flex justify-end">
				<Card.Root class="bg-accent">
					<Card.Header>
						<Card.Title>???</Card.Title>
					</Card.Header>
					<Card.Content>
						<p> ???</p>
					</Card.Content>
				</Card.Root>
			</div>

			<div class="row-start-1 row-end-13 justify-center ">
					<div class="w-2 h-[400px] bg-accent rounded-b-full" />
			</div>


			<div class="row-start-3 row-end-5 col-span-2 justify-start">
				<Card.Root class="bg-accent">
					<Card.Header>
						<Card.Title>Then there wasimasdasdasdase</Card.Title>
					</Card.Header>
					<Card.Content>
						<p>Experience 1</p>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</main>

<!--Footer-->
<footer class="text-center text-muted-foreground text-sm py-4">
	<p>&copy; 2024 Andreas Kongstad. Built with SvelteKit/Typescript</p>
</footer>