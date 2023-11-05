import db from "$lib/server/db"
import docker from "$lib/server/docker"
import { json } from "@sveltejs/kit"

export async function DELETE({ params }) {
    const container = await db.containers.findFirst({ where: { id: Number(params.id) } })
    if (!container) {
        return json({ message: `docker image not found` })
    }

    const res = docker.stop(container.containerID)
    if (!res.isOK) {
        return json({ message: `docker stop Failed:\n${res.stderr}` })
    }

    await db.containers.delete({ where: { id: container.id } })

    return json({ message: "success" })
}
