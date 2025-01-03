import { type SchemaTypeDefinition } from 'sanity'
import blogpost from './blogpost'
import { author } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogpost , author ] ,
}
