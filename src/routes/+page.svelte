<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	export let data;

	async function deleteImage(id: number) {
		if (confirm('Delete image')) {
			await fetch(`/api/${id}`, {
				method: 'DELETE'
			});
			await invalidateAll();
		}
	}
</script>

<h1>Docker Images</h1>

<ul>
	{#each data.images as i}
		<li>
			<p>{i.name}</p>
			<button on:click={() => deleteImage(i.id)}>delete</button>
		</li>
	{/each}
</ul>

<a href="/new">new</a>
