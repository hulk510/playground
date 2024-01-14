import { getPayloadCollection } from ".";
import type { Blog } from "./types";

export async function getBlogs(query: unknown = null) {
  return await getPayloadCollection<Blog>(
    `${import.meta.env.PAYLOAD_CMS_URL}/api/blogs`,
    query
  );
}
