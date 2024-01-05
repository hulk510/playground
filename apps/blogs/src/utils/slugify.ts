import { slug as slugger } from "github-slugger";
import type { Blog } from "../services/api/types";

export const slugifyStr = (str: string) => slugger(str);

// CollectionEntryってAPIの取得の型として使えない？
// astro内で使えるってだけなのかな？

const slugify = (blog: Blog) =>
  blog.slug ? slugger(blog.slug) : slugger(blog.title);

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;
