import { defineField, defineType } from "sanity";
import {DocumentTextIcon} from '@sanity/icons'


const blog = defineType({
  name: 'Blog_post',
  title: "Blog",
  type: "document",
  icon: DocumentTextIcon,

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
      type: "reference",
      to: { type: "author" }



    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }]


    }),


  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },





})
export default blog