import {
  HTMLConverterFeature,
  LinkFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical';
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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          LinkFeature({
            // Example showing how to customize the built-in fields
            // of the Link feature
            fields: [
              {
                name: 'rel',
                label: 'Rel Attribute',
                type: 'select',
                hasMany: true,
                options: ['noopener', 'noreferrer', 'nofollow'],
                admin: {
                  description:
                    'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                },
              },
            ],
          }),
          // The HTMLConverter Feature is the feature which manages the HTML serializers. If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
      required: true,
    },
    lexicalHTML('content', {
      name: 'content_html',
    }),
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
