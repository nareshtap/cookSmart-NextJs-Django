export const uploadImageToCloudinary = async (file: File) => {
    const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
        throw new Error('Missing Cloudinary configuration. Please check your environment variables.');
    }

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "post",
            body: uploadData,
        }
    );

    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(`Cloudinary upload failed: ${data.message || 'Unknown error'}`);
    }

    return data; 
};
