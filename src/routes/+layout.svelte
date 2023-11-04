<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { page } from '$app/stores';

	type Link = { href: string; title: string };

	const links: Link[] = [
		{ href: '/', title: 'Home' },
		{ href: '/new', title: 'New' },
		{ href: '/containers', title: 'Containers' }
	];
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">DockerHosting</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				{#each links as l}
					<li class="nav-item">
						<a class="nav-link {l.href === $page.url.pathname ? 'active' : ''}" href={l.href}
							>{l.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

<div class="container p-2">
	<slot />
</div>
