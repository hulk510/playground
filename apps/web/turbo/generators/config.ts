import type { PlopTypes } from '@turbo/gen'

const date = new Date()

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper('date', () => date.toISOString())
  // create a generator
  plop.setGenerator('new-blog', {
    description: 'Adds a new article to the blog',
    prompts: [
      {
        type: 'input',
        name: 'slug',
        message: '記事slugを入力してください',
      },
      {
        type: 'input',
        name: 'title',
        message: '記事タイトルを入力してください',
      },
      {
        type: 'input',
        name: 'description',
        message: '記事を表す概要説明は何にします？',
      },
      {
        name: 'tags',
        type: 'checkbox',
        message: '記事にタグつけますかー？',
        choices: ['playground', '適当'], // TODO: タグを増やす どういうタグがいいのか？
      },
    ],
    actions: [
      {
        type: 'add',
        path: './src/content/blog/{{dashCase slug}}.md',
        templateFile: 'templates/blog.hbs',
      },
    ],
  })
}
