<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
</script>
<div class=" text-center">
	<h1 class="p-5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl first:mt-0">
		WIP
	</h1>
</div>

<div class="flex items-center space-x-4 justify-center">
	<div class="space-y-2">
		<Skeleton class="h-4 w-[400px]" />
		<Skeleton class="h-4 w-[200px]" />
		<Skeleton class="h-4 w-[300px]" />
		<Skeleton class="h-4 w-[600px]" />
		<Skeleton class="h-4 w-[400px]" />
		<Skeleton class="h-4 w-[200px]" />
		<Skeleton class="h-4 w-[300px]" />
		<Skeleton class="h-4 w-[600px]" />
	</div>
</div>