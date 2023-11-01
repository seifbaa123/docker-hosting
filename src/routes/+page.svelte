<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	export let data;

	async function runContainer(id: number) {
		const res = await fetch(`/api/containers`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ imageId: id })
		});
		console.log(await res.json());
	}

	async function rebuildImage(id: number) {
		await fetch(`/api/images/${id}/rebuild`);
		await invalidateAll();
	}

	async function deleteImage(id: number) {
		if (confirm('Delete image')) {
			await fetch(`/api/images/${id}`, {
				method: 'DELETE'
			});
			await invalidateAll();
		}
	}
</script>

<h1>Home</h1>
<table class="table table-hover">
	<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">Name</th>
			<th scope="col">Has build</th>
			<th scope="col" />
			<th scope="col" />
			<th scope="col" />
		</tr>
	</thead>
	<tbody>
		{#each data.images as i}
			<tr>
				<th scope="row">{i.id}</th>
				<td class="w-75">{i.name}</td>
				<td class="w-25">{i.hasBuild ? 'yes' : 'no'}</td>
				<td>
					<button class="btn btn-outline-primary btn-sm" on:click={() => runContainer(i.id)}
						>run
					</button>
				</td>
				<td>
					<button class="btn btn-outline-primary btn-sm" on:click={() => rebuildImage(i.id)}
						>rebuild
					</button>
				</td>
				<td><a href="/update/{i.id}" class="btn btn-outline-success btn-sm">update</a></td>
				<td>
					<button class="btn btn-outline-danger btn-sm" on:click={() => deleteImage(i.id)}
						>delete
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
