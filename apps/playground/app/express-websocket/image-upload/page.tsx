import { Grid } from '../../_components/grid';

async function getImages() {
  const res = await fetch('http://localhost:3000/api/images');
  const images = await res.json();
  return images as { src: string; alt: string }[];
}

export default async function Page() {
  const urls = await getImages();

  // 全てのセル数
  const totalCells = 12 * 12;

  const images = Array.from({ length: totalCells }).map((_, i) => {
    if (i < urls.length) {
      return {
        src: urls[i]?.src ?? '/assets/noimage.png', // 画像のURL
        alt: `test${i}`,
        x: i % 12, // x座標
        y: Math.floor(i / 12), // y座標
      };
    } else {
      return {
        src: '/assets/noimage.png', // 空白のセル
        alt: `empty${i}`,
        x: i % 12,
        y: Math.floor(i / 12),
      };
    }
  });

  return <Grid rows={12} cols={12} images={images} />;
}
