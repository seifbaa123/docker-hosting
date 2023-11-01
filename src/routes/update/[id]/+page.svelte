<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	let name: string = data.image.name;
	let fileRef: HTMLInputElement;

	let disableUpdateName = false;
	let disableUpdateFiles = false;

	async function updateName() {
		if (name) {
			disableUpdateName = true;

			const formData = new FormData();
			formData.append('name', name);

			const res = await fetch(`/api/images/${data.image.id}`, {
				method: 'PUT',
				body: formData
			});
			console.log(await res.json());

			goto('/');
		}
	}

	async function updateFiles() {
		if (fileRef.files && fileRef.files[0]) {
			disableUpdateFiles = true;
			const file = fileRef.files[0];

			const formData = new FormData();
			formData.append('file', file);

			const res = await fetch(`/api/images/${data.image.id}`, {
				method: 'PUT',
				body: formData
			});
			console.log(await res.json());

			goto('/');
		}
	}
</script>

<form class="w-100" on:submit|preventDefault={updateName}>
	<h3>Update name</h3>
	<div class="form-floating mb-2">
		<input type="text" class="form-control" bind:value={name} />
		<label for="floatingInput">Name</label>
	</div>
	<button class="btn btn-primary py-2" disabled={disableUpdateName}>Submit</button>
</form>

<form class="w-100 pt-4" on:submit|preventDefault={updateFiles}>
	<h3>Update files</h3>
	<div class="form-floating mb-2">
		<input type="file" class="form-control" bind:this={fileRef} />
		<label for="floatingPassword">File</label>
	</div>
	<button class="btn btn-primary py-2" disabled={disableUpdateFiles}>Submit</button>
</form>
