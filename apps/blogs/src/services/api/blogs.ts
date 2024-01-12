import { getPayloadCollection } from ".";
import type { Blog } from "./types";

export async function getBlogs(query: any = null) {
  return await getPayloadCollection<Blog>(
    `${process.env.PAYLOAD_CMS_URL}/api/blogs`,
    query
  );
}
