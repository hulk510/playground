import { PrismaClient } from '@repo/db';
import { put } from '@vercel/blob';
import { url } from 'inspector';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');
  const x = searchParams.get('x');
  const y = searchParams.get('y');
  if (!filename || !req.body) {
    return new Response('filename or body is required', {
      status: 400,
    });
  }

  try {
    // ファイルを保存
    const blob = await put('mosaic-uploader/' + filename, req.body, {
      access: 'public',
    });
    await prisma.images.create({
      data: {
        x: Number(x),
        y: Number(y),
        url: blob.url,
      },
    });
    return Response.json({ url, x, y });
  } catch (error) {
    console.error('Error saving file:', error);
    return new Response('file save error', {
      status: 500,
    });
  }
}
