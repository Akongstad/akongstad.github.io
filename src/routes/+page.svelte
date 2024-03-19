<script lang="ts">
	import '../app.pcss';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import Sun from "svelte-radix/Sun.svelte";
	import Moon from "svelte-radix/Moon.svelte";
	import {LinkedinLogo, GithubLogo, DiscordLogo} from 'svelte-radix';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode } from "mode-watcher";
</script>

<!--Navbar-->
<div class="flex justify-between">
	<ul class="flex pl-10 pt-5">
		<li class="mr-6 px-1">
			<a href="/" class="inline-flex hover:underline space-x-2">
				<Avatar.Root class="size-8">
					<Avatar.Image src="https://github.com/Akongstad.png" alt="Andreas Kongstad" />
					<Avatar.Fallback>AK</Avatar.Fallback>
				</Avatar.Root>
				<div class="text-base font-semibold pt-1">andreas/kongstad</div>
			</a>
		</li>
		<li class="mr-6 px-1">
			<a href="/projects" class="text-bsm text-muted-foreground hover:text-accent-foreground">
				<div class="text-base font-light pt-1">projects</div>
			</a>
		<li class="mr-6 px-1">
			<a href="/blog" class="text-bsm text-muted-foreground hover:text-accent-foreground cursor-not-allowed">
				<div class="text-base font-light pt-1">blog</div>
			</a>
		</li>
	</ul>
	<!--socials-->
	<ul class="flex pl-10 pt-5 pr-3">
		<li >
			<Button variant="ghost" size="icon" >
				<GithubLogo class="h-4 w-4" />
			</Button>
			<Button variant="ghost" size="icon" >
				<LinkedinLogo class="h-4 w-4" />
			</Button>
			<Button variant="ghost" size="icon" >
				<DiscordLogo class="h-4 w-4" />
			</Button>
			<Button on:click={toggleMode} variant="ghost" size="icon">
				<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</Button>
		</li>
	</ul>
</div>


<Separator class="my-1" />
<div class="text-center">
	<header>
		<h1 class="p-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl first:mt-0">
			Hello there 👋
		</h1>
		<p class="leading-8 p-1 px-32 [&:not(:first-child)]:mt-6 text-xl text-muted-foreground">
			My name is <span class="text-amber-700">Andreas Kongstad</span>, I am a MSc Computer Science Student @ ITU in
			Copenhagen who likes problem-solving and
			learning and improving. I also enjoy coffee☕, running🏃, and many things tech🖥️.
		</p>
	</header>
</div>