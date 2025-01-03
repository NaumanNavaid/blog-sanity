export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-27'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)


function assertValue<T>(value: T, errorMessage: string): T {
  if (value) {
    return value
  } else {
    throw new Error(errorMessage)
  }
}