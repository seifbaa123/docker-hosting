import fs from "fs"

export function isFileExist(path: string): boolean {
    try {
        return fs.statSync(path).isFile()
    } catch {
        return false
    }
}
