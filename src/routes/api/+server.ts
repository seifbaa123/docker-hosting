import db from "$lib/server/db"
import { json } from "@sveltejs/kit"
import fs from "fs"
import decompress from "decompress"
import { fileTypeFromBuffer } from "file-type"
import { isFileExist } from "$lib/utils"

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

    const image = await db.dockerImages.create({ data: { name } })

    const tmpPath = `/tmp/${image.id}`
    const dirPath = `${process.env.DOCKER_IMAGES_DIR}/${image.id}`

    fs.writeFileSync(tmpPath, fileBuffer)
    await decompress(tmpPath, dirPath)
    fs.rmSync(tmpPath)

    if (!isFileExist(`${dirPath}/Dockerfile`)) {
        fs.rmdirSync(dirPath, { recursive: true })
        db.dockerImages.delete({ where: { id: image.id } })
        return json({ message: "Dockerfile is messing" })
    }

    return json({ message: "success" })
}
