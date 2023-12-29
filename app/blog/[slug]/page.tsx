import { client, urlFor } from "@/app/lib/sanity";
import { fullArticle } from "@/lib/interface";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30;

async function getSingleData(slug: string) {
  const query = `*[_type=='blog' && slug.current == '${slug}']  {
    'currentSlug': slug.current,  
    title,
      content,
        titleImage
    }[0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullArticle = await getSingleData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Andi Per - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
