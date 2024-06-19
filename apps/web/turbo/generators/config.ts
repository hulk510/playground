import type { PlopTypes } from "@turbo/gen";

const date = new Date();

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper("date", function () {
    return date.toISOString();
  }),
    // create a generator
    plop.setGenerator("new-blog", {
      description: "Adds a new article to the blog",
      prompts: [
        {
          type: "input",
          name: "slug",
          message: "記事のslugは何にしますか?",
        },
        {
          type: "input",
          name: "title",
          message: "記事のタイトルは何にしますか",
        },
        {
          type: "input",
          name: "description",
          message: "記事の説明は何にしますか",
        },
      ],
      actions: [
        {
          type: "add",
          path: "./src/content/blog/{{dashCase slug}}.md",
          templateFile: "templates/blog.hbs",
        },
      ],
    });
}
