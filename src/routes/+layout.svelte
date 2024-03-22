<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { EnvelopeClosed, GithubLogo, LinkedinLogo } from 'svelte-radix';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { page } from '$app/stores';

	// This can be false if you're using a fallback (i.e. SPA mode)

</script>


<!--Navbar-->
<nav class="flex justify-between bg-opacity-30 pt-5 px-8 pb-3">
	<div class="flex space-x-7 pt-1">
		<div>
			<a href="/" class="inline-flex hover:underline space-x-1">
				<Avatar.Root class="size-8">
					<Avatar.Image src="https://github.com/Akongstad.png" alt="Andreas Kongstad" />
					<Avatar.Fallback>
						<Skeleton class="size-8 rounded-full" />
					</Avatar.Fallback>
				</Avatar.Root>
				{#if $page.url.pathname === "/"}
					<div class="text-lg font-semibold">andreas/kongstad</div>
				{:else }
					<div class="text-lg font-light text-muted-foreground hover:text-accent-foreground">andreas/kongstad</div>
				{/if}
			</a>
		</div>
		<a href="/projects" class="text-bsm hover:underline">
			{#if $page.url.pathname === "/projects"}
				<div class="text-lg font-semibold">projects</div>
			{:else }
				<div class="text-lg font-light text-muted-foreground hover:text-accent-foreground">projects</div>
			{/if}
		</a>
	</div>
	<!--icons-->
	<div>
		<Button variant="ghost" size="icon">
			<a href="https://github.com/Akongstad" target="_blank" rel="noreferrer">
				<GithubLogo class="h-6 w-6 hover:text-purple-700" />
			</a>
		</Button>
		<Button variant="ghost" size="icon">
			<a href="https://www.linkedin.com/in/andreas-kongstad/" target="_blank" rel="noreferrer">
				<LinkedinLogo class="h-6 w-6 hover:text-blue-700" />
			</a>
		</Button>
		<Button variant="ghost" size="icon">
			<a href = "mailto: akongstad.contact@icloud.com">
				<EnvelopeClosed class="h-6 w-6 hover:text-blue-700" />
			</a>
		</Button>
		<Button on:click={toggleMode} variant="ghost" size="icon">
			<Sun class="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-amber-400 " />
			<Moon class="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-amber-200" />
		</Button>
	</div>
</nav>
<Separator class="my-1" />

<slot />