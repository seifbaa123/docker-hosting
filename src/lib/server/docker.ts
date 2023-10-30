import { spawnSync } from "child_process"

function build(imageName: string, dirPath: string): string {
    const child = spawnSync("docker", ["build", "-t", imageName, dirPath])
    return child.stderr.toString()
}

function rmi(imageName: string): string {
    const child = spawnSync("docker", ["rmi", imageName, "--force"])
    return child.stderr.toString()
}

export default { build, rmi }
