<script lang="ts">
	let name: string = 'name';
	let fileRef: HTMLInputElement;

	async function handleSubmit() {
		if (name && fileRef.files && fileRef.files[0]) {
			const file = fileRef.files[0];

			const formData = new FormData();
			formData.append('name', 'test');
			formData.append('file', file);

			const res = await fetch('/api', {
				method: 'POST',
				body: formData
			});
			const data = await res.json();
			console.log(data);
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" bind:value={name} />
	<input type="file" bind:this={fileRef} />
	<button>submit</button>
</form>
