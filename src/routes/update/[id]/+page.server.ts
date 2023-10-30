import db from "$lib/server/db"

export async function load({ params }) {
    const image = await db.dockerImages.findFirstOrThrow({ where: { id: Number(params.id) } })
    return { image }
}
