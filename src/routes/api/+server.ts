import db from "$lib/server/db"
import { json } from "@sveltejs/kit"
import fs from "fs"
import decompress from "decompress"
import { fileTypeFromBuffer } from "file-type"
import { isFileExist } from "$lib/utils"
import { spawnSync } from "child_process";

export async function GET() {
    const images = await db.dockerImages.findMany()
    return json({ images })
}

export async function POST({ request }) {
    const body = await request.formData()
    const name = body.get("name")?.toString() as string
    const file = body.get("file") as File

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileType = await fileTypeFromBuffer(fileBuffer)
    if (fileType?.mime !== "application/zip" && fileType?.mime !== "application/gzip") {
        return json({ message: "Invalid file type" })
    }

    const image = await db.dockerImages.create({ data: { name, hasBuild: false } })

    const tmpPath = `/tmp/${image.id}`
    const dirPath = `${process.env.DOCKER_IMAGES_DIR}/${image.id}`
    const dockerFile = `${dirPath}/Dockerfile`

    fs.writeFileSync(tmpPath, fileBuffer)
    await decompress(tmpPath, dirPath)
    fs.rmSync(tmpPath)

    if (!isFileExist(dockerFile)) {
        fs.rmSync(dirPath, { recursive: true })
        db.dockerImages.delete({ where: { id: image.id } })
        return json({ message: "Dockerfile is messing" })
    }

    const child = spawnSync("docker", ["build", "-t", image.id.toString(), dirPath])
    const stderr = child.stderr.toString()
    if (stderr) {
        return json({ message: `docker build Failed:\n${stderr}` })
    }

    db.dockerImages.update({ where: { id: image.id }, data: { hasBuild: true } })
    return json({ message: "success" })
}
