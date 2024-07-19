import { PrismaClient } from '@repo/db';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// revalidateした方が良い？
export async function GET() {
  const images = await prisma.images.findMany();
  return new Response(JSON.stringify(images), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 送信でファイルを保存している。この時にAPIに保存して本来はAPIのURLを保持するべきか。
// GETではそのx-yを元に保存するようにする。

// これ別にroute handler使わずにserver actionで書けば楽だと思う？
// わざわざAPIとして叩くよりも、リクエストするアクションとして作ってあげるべき？そうなるとAPIとしたい場合ってなんなの？
// server actionにした場合でもs3とかに保存するリクエストはできるはず。APIにする場面がよくわからん。
export async function POST(req: Request) {
  const fileName = randomUUID();
  const formData = await req.formData();
  const x = formData.get('x');
  const y = formData.get('y');
  const file = formData.get('image') as Blob | null;
  if (!file) {
    return new Response('file not found', {
      status: 400,
    });
  }
  console.log(file);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 保存先のディレクトリを指定
  const savePath = path.join(
    process.cwd(),
    'public',
    'assets',
    `${fileName}.jpg`,
  );

  try {
    // ファイルを保存
    await fs.writeFile(savePath, buffer);
    await prisma.images.create({
      data: {
        x: Number(x),
        y: Number(y),
        url: `${fileName}.jpg`,
      },
    });
    console.log(`File saved to ${savePath}`);
  } catch (error) {
    console.error('Error saving file:', error);
    return new Response('file save error', {
      status: 500,
    });
  }

  return Response.json({ url: `${fileName}.jpg`, x, y });
}
