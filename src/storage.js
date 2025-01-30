import { addDoc, collection } from "firebase/firestore";
import { db } from './firebase';

export async function uploadToCloudinary(file) {
    // const CLOUD_NAME = "dytkisx48"; 
    const UPLOAD_PRESET = "googledrive";
    
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dytkisx48/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      // const data = await response.json();
      const data = await response.json();
      if (data.secure_url) {
        console.log("File URL:", data.secure_url);
        await addDoc(collection(db, "myfiles"), {
          name: file.name, // Store the file name
          public_id: data.public_id, // Cloudinary file ID
          url: data.secure_url, // Cloudinary file URL
          bytes: file.size, // File size in bytes
          // metadata: {
          //   owner: user.displayName || "Unknown",
          // },
          created_at: new Date(), // Timestamp when file was uploaded
        });
        // return data.secure_url;
      } else {
        throw new Error("Upload failed! Check Cloudinary settings.");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  }
  






  // Cloudnary API Key
// 748191584137593
// url: CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dytkisx48
// cloud name: dytkisx48