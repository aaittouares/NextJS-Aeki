import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  forcePathStyle: true,
  region: process.env.BUCKET_REGION,
  endpoint: process.env.SUPABASE_BUCKET_URL,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY as string,
  },
})
