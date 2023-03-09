import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post } from '@/models';

const BLOG_FOLDER = path.join(process.cwd(), '/src/blog');

export async function getBlogList(): Promise<Post[]> {
  const fileNameList = fs.readdirSync(BLOG_FOLDER);

  const postList: Post[] = [];
  for (const fileName of fileNameList) {
    const filePath = path.join(BLOG_FOLDER, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, excerpt, content } = matter(fileContent, {
      excerpt_separator: '<!-- truncate-->',
    });

    postList.push({
      id: fileName,
      slug: data.slug,
      title: data.title,
      description: excerpt || '',
      author: {
        name: data.author,
        title: data.author_title,
        avatarUrl: data.author_url,
        profileUrl: data.author_image_url,
      },
      tagList: data.tags,
      publishedDate: data.date,
      mdContent: content,
    });
  }

  return postList;
}
