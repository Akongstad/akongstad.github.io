<script lang="ts">
	import '../app.pcss';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';

</script>
<div class="flex-1 pl-10 pt-5">
	<a href="/" class="inline-flex hover:underline space-x-2">
		<Avatar.Root>
			<Avatar.Image src="https://github.com/Akongstad.png" alt="Andreas Kongstad" />
			<Avatar.Fallback>AK</Avatar.Fallback>
		</Avatar.Root>
		<div class="text-lg font-semibold pt-1">andreas/kongstad</div>

	</a>
</div>
<Separator class="my-4" />
<div class="text-center">
	<h1 class="p-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl first:mt-0">
		Hello there 👋
	</h1>
	<p class="leading-8 p-1 px-32 [&:not(:first-child)]:mt-6 text-xl text-muted-foreground">
		My name is <span class="text-amber-700">Andreas Kongstad</span>, I am a MSc Computer Science Student @ ITU in
		Copenhagen who likes problem-solving and
		learning and improving. I also enjoy coffee☕, running🏃, and many things tech🖥️.
	</p>
</div>