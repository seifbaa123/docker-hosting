import db from "$lib/server/db"

export async function load() {
    const images = await db.dockerImages.findMany()
    return { images }
}