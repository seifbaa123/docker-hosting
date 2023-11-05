import db from "$lib/server/db"
import { json } from "@sveltejs/kit"
import docker from "$lib/server/docker"

export async function POST({ request }) {
    const body = await request.json()

    if (!db.dockerImages.findFirst({ where: { id: body.imageId } })) {
        return json({ message: `docker image not found` })
    }

    const res = docker.run(body.imageId)
    if (!res.isOK) {
        return json({ message: `docker run Failed:\n${res.stderr}` })
    }

    await db.containers.create({ data: { imageId: body.imageId, containerID: res.stdout.trim() } })

    return json({ message: "success" })
}
