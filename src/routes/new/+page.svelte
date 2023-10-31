<script lang="ts">
	import { goto } from '$app/navigation';

	let name: string = '';
	let fileRef: HTMLInputElement;
	let disable = false;

	async function handleSubmit() {
		if (name && fileRef.files && fileRef.files[0]) {
			disable = true;
			const file = fileRef.files[0];

			const formData = new FormData();
			formData.append('name', name);
			formData.append('file', file);

			const res = await fetch('/api', {
				method: 'POST',
				body: formData
			});
			const data = await res.json();
			console.log(data);

			goto('/');
		}
	}
</script>

<h3>Add new docker image</h3>
<form class="w-100" on:submit|preventDefault={handleSubmit}>
	<div class="form-floating mb-2">
		<input type="text" class="form-control" bind:value={name} />
		<label for="floatingInput">Name</label>
	</div>
	<div class="form-floating mb-2">
		<input type="file" class="form-control" bind:this={fileRef} />
		<label for="floatingPassword">File</label>
	</div>
	<button class="btn btn-primary py-2" disabled={disable}>Submit</button>
</form>
