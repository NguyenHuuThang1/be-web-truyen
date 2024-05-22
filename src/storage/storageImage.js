import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {configureCloudinary} from '../configCloud.js';
import multer from 'multer';



const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: configureCloudinary(),
  params: {
    allowed_formats: ['jpg', 'jpeg', 'png'], // Định dạng file cho phép
  },
});

export const storageCoverImage = new CloudinaryStorage({
  cloudinary: configureCloudinary(),
  params: {
    folder: 'Data/coverImg', // Thư mục trên Cloudinary để lưu trữ ảnh
    allowed_formats: ['jpg', 'jpeg', 'png'], // Định dạng file cho phép
  },
});

export const storagePhoto = new CloudinaryStorage({
  cloudinary: configureCloudinary(),
  params: {
    folder: 'Data/photo', // Thư mục trên Cloudinary để lưu trữ ảnh
    allowed_formats: ['jpg', 'jpeg', 'png'], // Định dạng file cho phép
  },
});


export const uploadImg = multer({ storage: storageCoverImage });
export const uploadPhoto = multer({ storage: storagePhoto });
export const upload = multer({ storage: cloudinaryStorage });
