
console.log("CLOUD:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("KEY:", process.env.CLOUDINARY_API_KEY);
console.log("SECRET:", process.env.CLOUDINARY_API_SECRET);



import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(
    req: Request
) {
    const data =
        await req.formData();

    const file =
        data.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded" },
            { status: 400 }
        );
    }

    const bytes =
        await file.arrayBuffer();

    const buffer =
        Buffer.from(bytes);

    try {
        const result = await new Promise<any>(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            resource_type: "raw",
                            folder: "resumes",
                            use_filename: true,
                            unique_filename: true,
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    )
                    .end(buffer);
            }
        );
        console.log("FULL CLOUDINARY RESULT");
        console.log(result);


        console.log("FULL CLOUDINARY RESULT");
        console.log(result);

        const fileUrl =
            result.secure_url.replace(
                "/upload/",
                "/upload/fl_attachment/"
            );

        return NextResponse.json({
            url: fileUrl,
        });

    } catch (error: any) {
    console.error(
        "FULL CLOUDINARY ERROR:",
        JSON.stringify(error, null, 2)
    );

    return NextResponse.json(
        {
            error: "Upload failed",
        },
        {
            status: 500,
        }
    );
}
}