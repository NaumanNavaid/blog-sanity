import { type SchemaTypeDefinition } from 'sanity'
import blogpost from './blogpost'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogpost],
}
