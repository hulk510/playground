import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload/types';

const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
    },
    {
      name: 'draft',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

export default Blogs;
