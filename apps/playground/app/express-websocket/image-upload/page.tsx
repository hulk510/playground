import { Grid } from '../../_components/grid';

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
  const totalCells = 12 * 12;

  // 空の画像グリッドを作成
  const images = Array.from({ length: totalCells }).map((_, i) => ({
    src: '/assets/noimage.png', // 空白のセル
    alt: `empty${i}`,
    x: i % 12,
    y: Math.floor(i / 12),
  }));

  // 取得した画像を対応する位置にセット
  urls.forEach((image) => {
    const index = image.y * 12 + image.x; // x, yからインデックスを計算
    images[index] = {
      src: `/assets/${image.url}`,
      alt: image.url,
      x: image.x,
      y: image.y,
    };
  });

  return <Grid rows={12} cols={12} images={images} />;
}
