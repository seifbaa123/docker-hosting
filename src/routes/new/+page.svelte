<script lang="ts">
	import { goto } from '$app/navigation';

	let name: string = 'name';
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

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" bind:value={name} />
	<input type="file" bind:this={fileRef} />
	<button disabled={disable}>submit</button>
</form>
