import { client } from '@/sanity/lib/client';
import { PortableText } from 'next-sanity';
import React from 'react';
import Image from 'next/image';

export const revalidate = 10
interface Author {
  name: string;
  currentslug: string;
  image: { asset: { url: string; }; };
}
interface Blog_post {
  title: string;
  image: { asset: { url: string; }; };
  author: Author;
  content: any;
  currentslug: string
}
const getdata = async (slug: string) => {

  const query = `*[_type== "Blog_post" && slug.current=="${slug}"]  
    {
        title,
         image {
           asset->{
             url
           }
         },
  content[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        url
      },
      alt
    }
  } ,         "currentslug" : slug.current,
       
       author ->{
       name,
           "currentslug" : slug.current,
             image {
           asset->{
             url
           }
         }
     
     }
          }[0]`;

  const data: Blog_post = await client.fetch(query);
  return data
}


export default async function Page(props: any) {
  const { params } = props;
  const data: Blog_post = await getdata(params.slug);

  return (
    <div className="max-w-4xl mx-auto px-4 shadow-lg">



      <h1>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>

        <span className=' block text-center text-lg font-bold mt-3 '> By: {data.author.name}</span>

      </h1>
      <Image
        src={data.image.asset.url}
        alt={data.title}
        width={896}
        height={896
          
        }
        className='mt-10 rounded-lg'
      />
      <div className="mt-16 prose">
        {data.content.map((block: any, index: number) => {
          if (block._type === 'image') {
            return (
              <Image
                key={index}
                src={block.asset.url}
                alt={block.alt || 'Image'}
                width={800}
                height={800}
                className="mt-10 rounded-lg"
              />
            );
          }
          return <PortableText key={index} value={block} />;
        })}
      </div>
    </div>
  );
}