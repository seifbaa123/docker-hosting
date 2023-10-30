<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

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
<a href="/new">new</a>

<ul>
	{#each data.images as i}
		<li>
			<p>{i.name}</p>
			<button on:click={() => goto(`/update/${i.id}`)}>update</button>
			<button on:click={() => deleteImage(i.id)}>delete</button>
		</li>
	{/each}
</ul>
