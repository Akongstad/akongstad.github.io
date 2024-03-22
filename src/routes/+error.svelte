<script lang="ts">
	import { base } from '$app/paths';
	import { redirect } from '@sveltejs/kit';

	throw redirect(307, base + '/');
</script>