import db from '$lib/server/db';
import docker from '$lib/server/docker.js';
import { isFileExist, mvDir } from '$lib/utils';
import { json } from '@sveltejs/kit';
import decompress from 'decompress';
import { fileTypeFromBuffer } from 'file-type';
import fs from 'fs';

export async function PUT({ params, request }) {
	const body = await request.formData();

	if (body.get('name')) {
		const image = await db.dockerImages.update({
			where: { id: Number(params.id) },
			data: { name: body.get('name') as string, hasBuild: undefined }
		});
		return json({ image });
	}

	if (body.get('file')) {
		const file = body.get('file') as File;

		const fileBuffer = Buffer.from(await file.arrayBuffer());
		const fileType = await fileTypeFromBuffer(fileBuffer);
		if (fileType?.mime !== 'application/zip' && fileType?.mime !== 'application/gzip') {
			return json({ message: 'Invalid file type' });
		}

		const tmpPath = `/tmp/${params.id}`;
		const dirPath = `${process.env.DOCKER_IMAGES_DIR}/${params.id}`;
		const dirPathBac = dirPath + '.bac';
		const dockerFile = `${dirPath}/Dockerfile`;

		fs.writeFileSync(tmpPath, fileBuffer);
		mvDir(dirPath, dirPathBac);
		await decompress(tmpPath, dirPath);
		fs.rmSync(tmpPath);

		if (!isFileExist(dockerFile)) {
			fs.rmSync(dirPath, { recursive: true });
			mvDir(dirPathBac, dirPath);
			return json({ message: 'Dockerfile is messing' });
		}

		fs.rmSync(dirPathBac, { recursive: true });
		const res = docker.build(params.id, dirPath);
		if (!res.isOK) {
			return json({ message: `docker build Failed:\n${res.stderr}` });
		}

		db.dockerImages.update({ where: { id: Number(params.id) }, data: { hasBuild: true } });
		return json({ message: 'success' });
	}

	return json({ message: 'Invalid data' }, { status: 400 });
}

export async function DELETE({ params }) {
	const dirPath = `${process.env.DOCKER_IMAGES_DIR}/${params.id}`;
	fs.rmSync(dirPath, { recursive: true });
	const res = docker.rmi(params.id);
	if (!res.isOK) {
		return json({ message: `docker remove image Failed:\n${res.stderr}` });
	}

	const image = await db.dockerImages.delete({ where: { id: Number(params.id) } });
	return json({ image });
}
