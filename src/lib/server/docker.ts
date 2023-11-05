import { spawnSync, type SpawnSyncReturns } from "child_process"

export type Result = {
    stdout: string
    stderr: string
    isOK: boolean
}

function build(imageName: string, dirPath: string): Result {
    const child = spawnSync("docker", ["build", "-t", imageName, dirPath])
    return getReturnValue(child)
}

function rmi(imageName: string): Result {
    const child = spawnSync("docker", ["rmi", imageName, "--force"])
    return getReturnValue(child)
}

function run(imageName: string): Result {
    const child = spawnSync("docker", ["run", "--rm", "-d", imageName])
    return getReturnValue(child)
}

function stop(containerID: string): Result {
    const child = spawnSync("docker", ["stop", containerID])
    return getReturnValue(child)
}

function getReturnValue(childProcess: SpawnSyncReturns<Buffer>): Result {
    return {
        stdout: childProcess.stdout.toString(),
        stderr: childProcess.stderr.toString(),
        isOK: childProcess.status === 0
    }
}

export default { build, rmi, run, stop }
