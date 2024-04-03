<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { EnvelopeClosed, GithubLogo, LinkedinLogo, Padding } from 'svelte-radix';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { page } from '$app/stores';
	import { base } from '$app/paths';


</script>


<!--Navbar-->
<header>
<nav class=" bg-accent bg-opacity-95 pt-5 px-8 pb-3 fixed w-full z-20">
	<div class="flex justify-between">
		<div class="flex space-x-7 pt-1">
			<div>
				<a href="{base}/#top"
					class="inline-flex hover:underline space-x-1">
					<Avatar.Root class="size-8">
						<Avatar.Image src="https://github.com/Akongstad.png" alt="Andreas Kongstad" />
						<Avatar.Fallback>
							<Skeleton class="size-8 rounded-full" />
						</Avatar.Fallback>
					</Avatar.Root>
					{#if $page.url.pathname === base + "/"}
						<div class="text-lg font-semibold">andreas/kongstad</div>
					{:else }
						<div class="text-lg font-light text-muted-foreground hover:text-accent-foreground">andreas/kongstad</div>
					{/if}
				</a>
			</div>
			<a href="{base}/projects" class="text-bsm hover:underline">
				{#if $page.url.pathname === base + "/projects"}
					<div class="text-lg font-semibold">projects</div>
				{:else }
					<div class="text-lg font-light text-muted-foreground hover:text-accent-foreground">projects</div>
				{/if}
			</a>
		</div>
		<!--icons-->
		<div>
			<Button variant="ghost" size="icon" class="max-sm:hidden">
				<a href="https://github.com/Akongstad" target="_blank" rel="noreferrer">
					<GithubLogo class="h-6 w-6 hover:text-purple-700" />
				</a>
			</Button>
			<Button variant="ghost" size="icon" class="max-sm:hidden">
				<a href="https://www.linkedin.com/in/andreas-kongstad/" target="_blank" rel="noreferrer">
					<LinkedinLogo class="h-6 w-6 hover:text-blue-700" />
				</a>
			</Button>
			<Button variant="ghost" size="icon" class="max-sm:hidden">
				<a href="mailto: akongstad.contact@icloud.com">
					<EnvelopeClosed class="h-6 w-6 hover:text-blue-700" />
				</a>
			</Button>
			<Button on:click={toggleMode} variant="ghost" size="icon">
				<Sun class="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:text-amber-400 " />
				<Moon
					class="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:text-amber-200" />
			</Button>
		</div>
	</div>
</nav>
</header>
<Padding class="h-32
 invisible" />
<slot />