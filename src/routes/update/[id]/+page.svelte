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

			const res = await fetch(`/api/${data.image.id}`, {
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

			const res = await fetch(`/api/${data.image.id}`, {
				method: 'PUT',
				body: formData
			});
			console.log(await res.json());

			goto('/');
		}
	}
</script>

<form on:submit|preventDefault={updateName}>
	<input type="text" bind:value={name} />
	<button disabled={disableUpdateName}>submit</button>
</form>

<form on:submit|preventDefault={updateFiles}>
	<input type="file" bind:this={fileRef} />
	<button disabled={disableUpdateFiles}>submit</button>
</form>
