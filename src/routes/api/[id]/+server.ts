import db from "$lib/server/db"
import { json } from "@sveltejs/kit"

export async function PUT({ params, request }) {
    const body = await request.json()
    const image = await db.dockerImages.update({ where: { id: Number(params.id) }, data: body })
    return json({ image })
}

export async function DELETE({ params }) {
    const image = await db.dockerImages.delete({ where: { id: Number(params.id) } })
    return json({ image })
}
