import { s3 } from '@/shared/api/supabase-bucket/bucket-client'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const bucketName = process.env.BUCKET_NAME

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
