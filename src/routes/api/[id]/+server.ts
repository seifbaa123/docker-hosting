import db from "$lib/server/db"
import docker from "$lib/server/docker.js"
import { json } from "@sveltejs/kit"
import fs from "fs"

export async function PUT({ params, request }) {
    const body = await request.json()
    const image = await db.dockerImages.update({ where: { id: Number(params.id) }, data: body })
    return json({ image })
}

export async function DELETE({ params }) {
    const dirPath = `${process.env.DOCKER_IMAGES_DIR}/${params.id}`
    fs.rmSync(dirPath, { recursive: true })
    docker.rmi(params.id)
    const image = await db.dockerImages.delete({ where: { id: Number(params.id) } })
    return json({ image })
}
