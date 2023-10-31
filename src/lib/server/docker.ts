import { spawnSync, type SpawnSyncReturns } from "child_process"

function build(imageName: string, dirPath: string): string {
    const child = spawnSync("docker", ["build", "-t", imageName, dirPath])
    return getReturnValue(child)
}

function rmi(imageName: string): string {
    const child = spawnSync("docker", ["rmi", imageName, "--force"])
    return getReturnValue(child)
}

function getReturnValue(childProcess: SpawnSyncReturns<Buffer>) {
    if (childProcess.status != 0) {
        return childProcess.stderr.toString()
    }

    return ""
}

export default { build, rmi }
