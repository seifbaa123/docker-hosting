<script lang="ts">
	export let data;
</script>

<h1>Containers</h1>
<table class="table table-hover">
	<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">ContainerID</th>
			<th scope="col" />
		</tr>
	</thead>
	<tbody>
		{#each data.containers as i}
			<tr>
				<th scope="row">{i.id}</th>
				<td class="w-100">{i.containerID}</td>
				<td>
					<button class="btn btn-outline-danger btn-sm">delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
