import fs from "fs"

export function isFileExist(path: string): boolean {
    try {
        return fs.statSync(path).isFile()
    } catch {
        return false
    }
}

export function mvDir(src: string, dist: string) {
    if (!fs.existsSync(src)) {
        console.log('Source folder does not exist.');
        return;
    }

    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
    }

    const items = fs.readdirSync(src);

    items.forEach(item => {
        const sourceItem = `${src}/${item}`;
        const targetItem = `${dist}/${item}`;

        fs.renameSync(sourceItem, targetItem);
    });

    fs.rmSync(src, { recursive: true });
}
