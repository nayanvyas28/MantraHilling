import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const contentTypeHeader = request.headers.get("content-type") || "";

    // Retrieve R2 keys from headers (optional client-side override) or environment variables
    const accessKeyId = request.headers.get("x-r2-access-key-id") || process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = request.headers.get("x-r2-secret-access-key") || process.env.R2_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      return NextResponse.json(
        { error: "R2 credentials are not configured. Please set them in Settings or server environment variables." },
        { status: 401 }
      );
    }

    // Initialize AWS S3 Client with R2 Credentials
    const s3 = new S3Client({
      endpoint: "https://2c91ec3e8bbe84328ecbd409f15edb82.r2.cloudflarestorage.com",
      region: "auto",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    if (contentTypeHeader.includes("multipart/form-data")) {
      // 1. Direct Server-Side Upload (CORS-free, extremely robust!)
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file) {
        return NextResponse.json({ error: "File is required" }, { status: 400 });
      }

      const filename = file.name;
      let fileType = file.type;
      if (!fileType || fileType === "application/octet-stream" || fileType === "binary/octet-stream") {
        if (filename.toLowerCase().endsWith(".wav")) {
          fileType = "audio/wav";
        } else if (filename.toLowerCase().endsWith(".mp3")) {
          fileType = "audio/mpeg";
        } else if (filename.toLowerCase().endsWith(".ogg")) {
          fileType = "audio/ogg";
        } else if (filename.toLowerCase().endsWith(".m4a")) {
          fileType = "audio/mp4";
        } else {
          fileType = "audio/mpeg";
        }
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const key = `hilling/music/${filename}`;
      const command = new PutObjectCommand({
        Bucket: "hilling",
        Key: key,
        Body: buffer,
        ContentType: fileType,
      });

      await s3.send(command);
      const encodedKey = key.split('/').map(segment => encodeURIComponent(segment)).join('/');
      const publicUrl = `https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/${encodedKey}`;

      return NextResponse.json({ publicUrl, success: true });
    } else {
      // 2. Presigned URL generation fallback (legacy)
      const { filename, contentType } = await request.json();
      let determinedContentType = contentType;
      if (!determinedContentType || determinedContentType === "application/octet-stream" || determinedContentType === "binary/octet-stream") {
        if (filename.toLowerCase().endsWith(".wav")) {
          determinedContentType = "audio/wav";
        } else if (filename.toLowerCase().endsWith(".mp3")) {
          determinedContentType = "audio/mpeg";
        } else if (filename.toLowerCase().endsWith(".ogg")) {
          determinedContentType = "audio/ogg";
        } else if (filename.toLowerCase().endsWith(".m4a")) {
          determinedContentType = "audio/mp4";
        } else {
          determinedContentType = "audio/mpeg";
        }
      }

      if (!filename) {
        return NextResponse.json({ error: "Filename is required" }, { status: 400 });
      }

      const key = `hilling/music/${filename}`;
      const command = new PutObjectCommand({
        Bucket: "hilling",
        Key: key,
        ContentType: determinedContentType,
      });

      // Generate pre-signed URL valid for 15 minutes
      const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 900 });
      const encodedKey = key.split('/').map(segment => encodeURIComponent(segment)).join('/');
      const publicUrl = `https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/${encodedKey}`;

      return NextResponse.json({ uploadUrl, publicUrl });
    }
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
