import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {configureCloudinary} from '../configCloud.js';
import multer from 'multer';



export const storageUser = new CloudinaryStorage({
  cloudinary: configureCloudinary(),
  params: {
    folder: 'Data/avatars', // Thư mục trên Cloudinary để lưu trữ ảnh
    allowed_formats: ['jpg', 'jpeg', 'png'], // Định dạng file cho phép
  },
});

export const uploadAvt = multer({ storage: storageUser });
