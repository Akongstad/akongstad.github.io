<script lang="ts">
import { toggleMode } from 'mode-watcher';
import { DiscordLogo, GithubLogo, LinkedinLogo } from 'svelte-radix';
import Sun from 'svelte-radix/Sun.svelte';
import Moon from 'svelte-radix/Moon.svelte';
import { Separator } from '$lib/components/ui/separator';
import { Button } from '$lib/components/ui/button';
import * as Avatar from '$lib/components/ui/avatar';
import { Skeleton } from '$lib/components/ui/skeleton';

let page = 'home';

</script>


<!--Navbar-->
<nav class="flex justify-between bg-opacity-30 pt-5 px-8 pb-3">
	<div>
		<a href="/" class="inline-flex hover:underline space-x-2">
			<Avatar.Root class="size-8">
				<Avatar.Image src="https://github.com/Akongstad.png" alt="Andreas Kongstad" />
				<Avatar.Fallback>
					<Skeleton class="size-8 rounded-full" />
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="text-lg font-semibold pt-1">andreas/kongstad</div>
		</a>
	</div>
	<a href="/projects" class="text-bsm text-muted-foreground hover:text-accent-foreground">
		<div class="text-lg font-light pt-1">projects</div>
	</a>
	<a href="/blog" class="text-bsm text-muted-foreground hover:text-accent-foreground cursor-not-allowed">
		<div class="text-lg font-light pt-1">blog</div>
	</a>
	<div class="px-60"></div>
	<!--socials-->
	<div>
		<Button variant="ghost" size="icon">
			<GithubLogo class="h-6 w-6" />
		</Button>
		<Button variant="ghost" size="icon">
			<LinkedinLogo class="h-6 w-6" />
		</Button>
		<Button variant="ghost" size="icon">
			<DiscordLogo class="h-6 w-6" />
		</Button>
		<Button on:click={toggleMode} variant="ghost" size="icon">
			<Sun class="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon class="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	</div>
</nav>
<Separator class="my-1" />

<slot />