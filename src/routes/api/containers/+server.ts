import db from "$lib/server/db"
import { json } from "@sveltejs/kit"
import docker from "$lib/server/docker"

export async function POST({ request }) {
    const body = await request.json()

    if (!db.dockerImages.findFirst({ where: { id: body.imageId } })) {
        return json({ message: `docker image not found` })
    }

    await db.containers.create({ data: body })

    const stderr = docker.run(body.imageId)
    if (stderr) {
        return json({ message: `docker run Failed:\n${stderr}` })
    }

    return json({ message: "success" })
}
