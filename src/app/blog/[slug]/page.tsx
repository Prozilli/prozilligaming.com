import BlogPost from "./BlogPost";

export async function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

export default function BlogPostPage() {
  return <BlogPost />;
}
