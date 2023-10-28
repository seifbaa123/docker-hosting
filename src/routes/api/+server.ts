import db from "$lib/server/db"
import { json } from "@sveltejs/kit"

export async function GET() {
    const images = await db.dockerImages.findMany()
    return json({ images })
}

export async function POST({ request }) {
    const body = await request.json()
    const image = await db.dockerImages.create({ data: body })
    return json({ image })
}
