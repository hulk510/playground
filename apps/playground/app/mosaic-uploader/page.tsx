import { Grid, UploadImage } from '../_components/grid';

async function getImages() {
  const res = await fetch(`${process.env.FRONTEND_URL}/api/images`, {
    next: { revalidate: 1 },
  });
  const images = await res.json();
  return images as { url: string; x: number; y: number }[];
}

export default async function Page() {
  const urls = await getImages();

  // 全てのセル数
  const totalCells = 24 * 24;

  // 空の画像グリッドを作成
  const images: UploadImage[] = Array.from({ length: totalCells }).map(
    (_, i) => ({
      url: '/assets/noImage.png', // 空白のセル
      x: i % 24,
      y: Math.floor(i / 24),
    }),
  );

  // 取得した画像を対応する位置にセット
  urls.forEach((image) => {
    const index = image.y * 24 + image.x; // x, yからインデックスを計算
    images[index] = {
      url: `/assets/${image.url}`,
      x: image.x,
      y: image.y,
    };
  });

  return (
    <main className=''>
      <div className='px-4 py-8'>
        <h1 className='text-5xl'>Mosaic Uploader</h1>
        <p>Click on a cell to upload an image</p>
      </div>
      <Grid images={images} />
    </main>
  );
}
