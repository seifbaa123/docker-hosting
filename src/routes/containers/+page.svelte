<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { copy } from 'svelte-copy';

	export let data;

	async function remove(id: number) {
		if (confirm('Remove container')) {
			const res = await fetch(`/api/containers/${id}`, {
				method: 'DELETE'
			});
			console.log(await res.json());

			await invalidateAll();
		}
	}
</script>

<h1>Containers</h1>
<table class="table table-hover">
	<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">ContainerID</th>
			<th scope="col">ContainerIP</th>
			<th scope="col" />
		</tr>
	</thead>
	<tbody>
		{#each data.containers as i}
			<tr>
				<th scope="row">{i.id}</th>
				<td class="w-100">{i.containerID}</td>
				<td class="w-100" style="cursor: pointer" use:copy={i.containerIP}>{i.containerIP}</td>
				<td>
					<button class="btn btn-outline-danger btn-sm" on:click={() => remove(i.id)}
						>delete
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
