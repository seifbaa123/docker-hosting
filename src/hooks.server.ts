import db from '$lib/server/db';
import docker from '$lib/server/docker';

startup();
async function startup() {
	const containers = await db.containers.findMany();

	for (const c of containers) {
		if (docker.isContainerRunning(c.containerID.substring(0, 12))) {
			continue;
		}

		const res = docker.run(c.imageId.toString());
		if (res.isOK) {
			const r = await db.containers.update({
				data: { containerID: res.stdout.trim(), imageId: undefined },
				where: { id: c.id }
			});
			console.log(r);
		}
	}
}
