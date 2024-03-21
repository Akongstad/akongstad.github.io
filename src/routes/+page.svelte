<script lang="ts">
	import '../app.pcss';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onDestroy, onMount } from 'svelte';
	import {  Code, GithubLogo} from 'svelte-radix';
	import {fade } from 'svelte/transition';
	import { Progress } from '$lib/components/ui/progress';
	import { tweened } from 'svelte/motion';
	import { cubicOut, linear } from 'svelte/easing';
	import { typewriter } from '$lib/custom-transitions.js';

	let ready = false;

	/** @type {import('./$types').LayoutData} */
	export let data;

	// Education Progress
	let edStart = new Date(2020, 8, 1);
	let edEnd = new Date(2025, 6, 1);
	let now = new Date();
	let edProgress = (now.getTime() - edStart.getTime()) / (edEnd.getTime() - edStart.getTime()) * 100;
	let educationProgress = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});

	// Github Contributions
	let githubThisYear = tweened(0, {
		duration: 1000,
		easing: linear
	});
	let githubLastYear = tweened(0, {
		duration: 1000,
		easing: linear
	});
	let diff = data.thisYear - data.lastYear;
	let diffPercent = (diff / data.lastYear) * 100;



	onMount( () => {
		ready = true;
		educationProgress.set(edProgress);
		githubThisYear.set(data.thisYear);
		githubLastYear.set(diffPercent);
	});
	onDestroy(() => {
		ready = false;
	});

</script>

<div class="text-center">
	<header>
		<h1 class="p-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl first:mt-0">
			Hello there 👋
		</h1>
		{#if ready}
			<p transition:typewriter={{ speed: 3 }}
				 class="leading-8 p-1 px-32 [&:not(:first-child)]:mt-6 text-xl text-muted-foreground">
				My name is Andreas Kongstad, I am a MSc Computer Science Student @ ITU in
				Copenhagen who likes problem-solving and improving. I also enjoy coffee☕, running🏃, and many things tech🖥️.
			</p>
		{/if}
	</header>
</div>

{#if ready}
<div class="grid gap-4 md:grid-cols-2 p-20 " transition:fade={{duration: 100}}>
		<Card.Root>
			<Card.Header
				class="flex flex-row items-center justify-between space-y-0 pb-6">
				<Card.Title class="text-sm font-medium">Education Progress | MSc Computer Science</Card.Title>
				<Code class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<Progress value={$educationProgress} />
				<div class="flex justify-between pt-2">
					<p class="text-xs text-muted-foreground">{edStart.toDateString()}</p>
					<p class="text-xs text-muted-foreground">{Math.round(edProgress)}%</p>
					<p class="text-xs text-muted-foreground">{edEnd.toDateString()}</p>
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header
				class="flex flex-row items-center justify-between space-y-0 pb-2"
			>
				<Card.Title class="text-sm font-medium">Contributions (This month):</Card.Title>
				<GithubLogo class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold" title="The total number of contributions made to public GitHub repositories in the past month" >+{Math.round($githubThisYear)}</div>
				{#if diff > 0}
					<p class="text-xs text-muted-foreground" title="the percentage increase or decrease in contributions compared to the month.">+{Math.round($githubLastYear)}% from last month</p>
				{:else}
					<p class="text-xs text-muted-foreground" title="the percentage increase or decrease in contributions compared to the month.">{Math.round($githubLastYear)}% from last month</p>
				{/if}
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header
				class="flex flex-row items-center justify-between space-y-0 pb-2"
			>
				<Card.Title class="text-sm font-medium">Sales</Card.Title>
				<GithubLogo class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+12,234</div>
				<div class="flex justify-between">
					<p class="text-xs text-muted-foreground">{edStart}</p>
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header
				class="flex flex-row items-center justify-between space-y-0 pb-2"
			>
				<Card.Title class="text-sm font-medium">Active Now</Card.Title>
				<GithubLogo class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+573</div>
				<p class="text-xs text-muted-foreground">+201 since last hour</p>
			</Card.Content>
		</Card.Root>
		</div>
{/if}
