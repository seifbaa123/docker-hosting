import db from "$lib/server/db"

export async function load() {
    const containers = await db.containers.findMany()
    return { containers }
}