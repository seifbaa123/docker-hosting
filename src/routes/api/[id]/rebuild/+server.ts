import db from "$lib/server/db"
import { json } from "@sveltejs/kit"
import docker from "$lib/server/docker"

export async function GET({ params }) {
    const dirPath = `${process.env.DOCKER_IMAGES_DIR}/${params.id}`

    const stderr = docker.build(params.id, dirPath)
    if (stderr) {
        return json({ message: `docker build Failed:\n${stderr}` })
    }

    db.dockerImages.update({ where: { id: Number(params.id) }, data: { name: undefined, hasBuild: true } })
    return json({ message: "success" })
}
