<script lang="ts">
	import '../app.pcss';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onDestroy, onMount } from 'svelte';
	import { GithubLogo, ChevronDown, Calendar } from 'svelte-radix';
	import { fade } from 'svelte/transition';
	import { Progress } from '$lib/components/ui/progress';
	import { tweened } from 'svelte/motion';
	import { cubicOut, linear } from 'svelte/easing';
	import { typewriter } from '$lib/custom-transitions.js';
	import { Button } from '$lib/components/ui/button';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Skeleton } from '$lib/components/ui/skeleton';

	let ready = false;

	/** @type {import('./$types').LayoutData} */

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
	export let data;
	let diff = 0;

	let api: CarouselAPI;
	let current = 0;
	let count = 0;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			console.log('current');
			current = api.selectedScrollSnap() + 1;
		});
	}


	onMount(async () => {
		ready = true;
		let thisYear = await data.thisYear;
		let lastYear = await data.lastYear;
		let diff = thisYear.length - lastYear.length;
		let diffPercent = (diff / lastYear.length) * 100;
		educationProgress.set(edProgress);
		await githubThisYear.set(thisYear.length);
		await githubLastYear.set(diffPercent);
	});
	onDestroy(() => {
		ready = false;
	});
</script>

<div class="flex justify-center p-10">
	<Avatar.Root class="size-44 sm:size-44 md:size-60">
		<Avatar.Image src="https://github.com/Akongstad.png" alt="Andreas Kongstad" />
		<Avatar.Fallback>
			<Skeleton class="size-32 sm:size-44 md:size-60 rounded-full" />
		</Avatar.Fallback>
	</Avatar.Root>
</div>
<div class="text-center">
	<header>
		<h1 class="p-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl first:mt-0">
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
				<Calendar class="h-4 w-4 text-muted-foreground" />
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
				{#if $githubThisYear === 0}
					<p class="text-xs text-muted-foreground">Github API rate limit reached. Come back later</p>
				{:else}
					<div class="text-2xl font-bold"
							 title="The total number of contributions made to public GitHub repositories in the past month">
						+{Math.round($githubThisYear)}</div>
				{/if}
				{#if diff > 0}
					<p class="text-xs text-muted-foreground"
						 title="the percentage increase or decrease in contributions compared to the last month.">
						+{Math.round($githubLastYear)}% from last month</p>
				{:else}
					<p class="text-xs text-muted-foreground"
						 title="the percentage increase or decrease in contributions compared to the month.">{Math.round($githubLastYear)}
						% from last month</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
	<div class="justify-center grid">
		<Button variant="ghost" size="icon" class="size-20">
			<ChevronDown class="size-full" />
		</Button>
		<h2 class="text-2xl font-bold text-accent-foreground text-center pt-64">Projects</h2>
	</div>
	<div class="grid justify-center p-5">
		<Carousel.Root bind:api class="md:w-[800px] sm:w-[500px] lg:w-px[1200]">
			<Carousel.Content>
				{#each Array(5) as _, i (i)}
					<Carousel.Item class="md:basis-1/3 sm:basis-1/2">
						<div>
						<Card.Root>
							<Card.Content
								class="flex aspect-square items-center justify-center p-6">
								<span class="text-4xl font-semibold">{i + 1}</span>
							</Card.Content>
						</Card.Root>
					</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
		<div class="py-2 text-center text-sm text-muted-foreground">
			Slide {current} of {count}
		</div>
	</div>
{/if}