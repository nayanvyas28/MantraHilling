import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Retrieve R2 keys from headers or environment variables
    const accessKeyId = request.headers.get("x-r2-access-key-id") || process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = request.headers.get("x-r2-secret-access-key") || process.env.R2_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      return NextResponse.json(
        { error: "R2 credentials are not configured. Please enter them in the R2 Storage tab." },
        { status: 401 }
      );
    }

    // Initialize S3 Client with R2 Credentials
    const s3 = new S3Client({
      endpoint: "https://2c91ec3e8bbe84328ecbd409f15edb82.r2.cloudflarestorage.com",
      region: "auto",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new ListObjectsV2Command({
      Bucket: "hilling",
      Prefix: "hilling/music/",
    });

    const response = await s3.send(command);
    const contents = response.Contents || [];

    const files = contents
      .filter((item) => !item.Key.endsWith("/")) // exclude directory placeholders
      .map((item) => {
        const key = item.Key;
        const filename = key.replace("hilling/music/", "");
        const encodedKey = key.split('/').map(segment => encodeURIComponent(segment)).join('/');
        return {
          key,
          filename,
          sizeBytes: item.Size,
          lastModified: item.LastModified,
          publicUrl: `https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/${encodedKey}`,
        };
      });

    return NextResponse.json({ files });
  } catch (error) {
    console.error("List Music API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "File key is required" }, { status: 400 });
    }

    // Retrieve R2 keys from headers or environment variables
    const accessKeyId = request.headers.get("x-r2-access-key-id") || process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = request.headers.get("x-r2-secret-access-key") || process.env.R2_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      return NextResponse.json(
        { error: "R2 credentials are not configured." },
        { status: 401 }
      );
    }

    // Initialize S3 Client with R2 Credentials
    const s3 = new S3Client({
      endpoint: "https://2c91ec3e8bbe84328ecbd409f15edb82.r2.cloudflarestorage.com",
      region: "auto",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new DeleteObjectCommand({
      Bucket: "hilling",
      Key: key,
    });

    await s3.send(command);

    return NextResponse.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete Music API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
