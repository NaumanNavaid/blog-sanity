import { defineField, defineType } from "sanity";



const blog = defineType({
  name: 'Blog_post',
  title: "Blog",
  type: "document",

  fields: [
    defineField({
      name: 'title',
      title: "Title",
      type: "string",



    }),
    defineField({
      name: 'slug',
      title: "Slug",
      type: "slug",
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      title: 'Launch Scheduled At',
      name: 'launchAt',
      type: 'datetime'
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true // <-- Defaults to false
      },
    }),
    defineField({
      name: 'author',
      title: "Author",
      type: "string",



    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }]


    }),


  ]




})
export default blog