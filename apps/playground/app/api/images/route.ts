import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  // assetsにある画像の一覧を取得
  const assetDir = path.join(process.cwd(), 'public', 'assets');
  const files = await fs.readdir(assetDir);
  const images = files.map((file) => {
    return {
      src: `/assets/${file}`,
      alt: file,
    };
  });
  console.log(images);
  return new Response(JSON.stringify(images), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 送信でファイルを保存している。この時にAPIに保存して本来はAPIのURLを保持するべきか。
// GETではそのx-yを元に保存するようにする。

export async function POST(req: Request) {
  const fileName = randomUUID();
  const formData = await req.formData();
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
    console.log(`File saved to ${savePath}`);
  } catch (error) {
    console.error('Error saving file:', error);
    return new Response('file save error', {
      status: 500,
    });
  }

  return new Response('success', {
    status: 200,
  });
}
