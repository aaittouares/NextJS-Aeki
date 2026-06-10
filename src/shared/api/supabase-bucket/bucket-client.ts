import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const bucketName = process.env.BUCKET_NAME

const s3 = new S3Client({
  forcePathStyle: true,
  region: process.env.BUCKET_REGION,
  endpoint: process.env.SUPABASE_BUCKET_URL,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY as string,
  },
})

export const uploadImage = async (image: File) => {
  const timestamp = Date.now()
  // const newName = `/users/${timestamp}-${image.name}`;
  const newName = `${timestamp}-${image.name}`

  const params = {
    Bucket: bucketName,
    Key: newName, // S3 object key (folder-like path)
    Body: image.stream(),
    ContentType: 'image/jpeg', // important for correct MIME type
  }

  try {
    const upload = new Upload({
      client: s3,
      params,
    })

    await upload.done()

    const publicFileUrl = `${process.env.BUCKET_PUBLIC_URL}/${bucketName}/${newName}`
    console.log('✅ Upload successful:', publicFileUrl)

    return publicFileUrl
  } catch (err) {
    console.error('❌ Upload failed:', err)
  }
}

export const deleteImage = async (url: string) => {
  const imageName = url.split('/').pop()
  if (!imageName) throw new Error('Invalid URL')

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: imageName,
    })

    const response = await s3.send(command)
    console.log(`✅ Deleted: ${imageName}`, response)
  } catch (err) {
    console.error('❌ Error deleting object:', err)
  }
}
