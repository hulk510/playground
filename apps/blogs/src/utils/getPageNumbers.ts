const getPageNumbers = (numberOfPosts: number) => {
  const numberOfPages = numberOfPosts / Number(10); // TODO: configか環境変数とかで設定できるようにする

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export default getPageNumbers;
