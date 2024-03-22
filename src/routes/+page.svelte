<!--Credits: UI components: ShadCn-->

<script lang="ts">
	import '../app.pcss';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onDestroy, onMount } from 'svelte';
	import { GithubLogo, EnvelopeClosed, Calendar, LinkedinLogo } from 'svelte-radix';
	import { fade } from 'svelte/transition';
	import { Progress } from '$lib/components/ui/progress';
	import { tweened } from 'svelte/motion';
	import { cubicOut, linear } from 'svelte/easing';
	import { typewriter } from '$lib/custom-transitions.js';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Skeleton } from '$lib/components/ui/skeleton';

	let ready = false;
	let bio = false;

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
		educationProgress.set(edProgress);
		let thisMonth = await data.thisMonth;
		let lastMonth = await data.lastMonth;
		diff = thisMonth.length - lastMonth.length;
		let diffPercent = (diff / lastMonth.length) * 100;
		await githubThisYear.set(thisMonth.length);
		await githubLastYear.set(diffPercent);
		bio = true;

	});
	onDestroy(() => {
		ready = false;
	});
</script>

<div class="flex justify-center p-10">
	<Avatar.Root class="size-44 sm:size-44 md:size-60 max-w-96">
		<Avatar.Image src="https://github.com/Akongstad.png" alt="Andreas Kongstad" />
		<Avatar.Fallback>
			<Skeleton class="size-32 sm:size-44 md:size-60 rounded-full" />
		</Avatar.Fallback>
	</Avatar.Root>
</div>
<header>
	<div class="flex justify-center mb-1 md:px-20 px-5 text-center ">
		<Card.Root class=" p-4 bg-accent text-left min-h-48 sm:w-[600px] md:w-[900px]">
			<div class="flex items-center mb-1">
				<div class="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
				<div class="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
			</div>
			<Card.Header>
				<Card.Title>
						<pre><span class="text-green-600">you@andreas-kongstad</span>:<span
							class="text-blue-500">/home/andreas$</span>{#if ready}<span transition:typewriter={{ speed: 1 }}> cat whoami.txt</span>{/if}</pre>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if bio}
					<code class="text-start font-mono" transition:typewriter={{ speed: 3 }}>Hello, my name is Andreas Kongstad,
						I am a MSc Computer Science Student @ ITU in Copenhagen who likes problem-solving and improving. I also
						enjoy coffee☕, running🏃, and many things tech🖥️.
					</code>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</header>


	<div class="flex justify-center ">
		<div class="grid gap-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 md:px-20 px-5 py-4 md:w-[1000px] w-[590px]"
				 transition:fade={{duration: 100}}>
			<Card.Root>
				<Card.Header>
					<div class="flex flex-row items-center justify-between space-y-0">
						<Card.Title class="text-base font-medium">Education Progress | MSc Computer Science</Card.Title>
						<Calendar class="h-6 w-6 text-muted-foreground" />
					</div>
				</Card.Header>
				{#if ready}
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
			<Card.Root>
				<div title="The total number of contributions made to public GitHub repositories in the past month">
					<Card.Header
						class="flex flex-row items-center justify-between space-y-0 pb-2"
					>
						<Card.Title class="text-base font-medium">Public Contributions (This month):</Card.Title>
						<GithubLogo class="h-6 w-6 text-muted-foreground" />
					</Card.Header>
					{#if ready}
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
								-{Math.round($githubLastYear)}
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

<footer class="text-center text-muted-foreground text-sm py-4">
	<p>&copy; 2024 Andreas Kongstad. Built with SvelteKit/Typescript</p>
</footer>