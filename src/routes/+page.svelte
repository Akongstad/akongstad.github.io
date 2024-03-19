<script lang="ts">
	import '../app.pcss';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import ChevronRight from 'svelte-radix/ChevronRight.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
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
	<ul class="flex pl-10 pt-5">
		<li >
			<Button variant="ghost" size="icon" >
				<ChevronRight class="h-4 w-4" />
			</Button>
			<Button variant="ghost" size="icon" >
				<ChevronRight class="h-4 w-4" />
			</Button>
			<Button variant="ghost" size="icon" >
				<ChevronRight class="h-4 w-4" />
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