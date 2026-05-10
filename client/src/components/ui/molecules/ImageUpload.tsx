import { useRef, useState } from 'react'
import Input from '../input'
import { ImageIcon, Upload, X, Loader2 } from 'lucide-react'
import Button from '../button'

import { useDeleteProjectImage, useUpdateDataProjectImage } from '@/hooks/useProject'

interface ImageUploadProps {
projectId: number
  currentImageUrl?: string | null;
}

const ImageUpload = ({ projectId, currentImageUrl }: ImageUploadProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hook xử lý Upload/Update ảnh
  const { mutate: updateImage, isPending: isUpdating } = useUpdateDataProjectImage();
  
  const { mutate: deleteImage, isPending: isDeleting } = useDeleteProjectImage();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 1. Validate file type
      if (!file.type.startsWith('image/')){
        alert('Vui lòng chọn file ảnh hợp lệ (jpg, png, webp...)');
        return;
      }
      
      // 2. Validate file size (Max 5MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("Kích thước ảnh không được vượt quá 10MB");
        return;
      }

      // 3. Gọi API đẩy thẳng file lên Backend (Cloudinary)
      updateImage({ projectId, file });

      // 4. Reset input để có thể chọn lại cùng 1 file nếu muốn
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  const handleRemoveImage = () => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa ảnh này khỏi dự án?");
    if (isConfirm) {
      // deleteImage({projectId, imageId:1});
      deleteImage(projectId)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  }

  const isLoading = isUpdating || isDeleting;

  return (
    <div
      className={
        `relative h-[40vh] bg-center bg-cover flex items-center justify-center rounded-xl
        shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] overflow-hidden transition-all
      `}
      style={{
        backgroundImage: currentImageUrl ? `url(${currentImageUrl})` : 'none',
        backgroundColor: currentImageUrl ? 'transparent' : '#f3f4f6',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='hidden'
        disabled={isLoading}
      />

      {/* OVERLAY LOADING: Hiển thị khi đang call API */}
      {isLoading && (
        <div className='absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center text-white'>
          <Loader2 className="animate-spin mb-3" size={36} />
          <p className='text-md font-medium tracking-wide'>Đang xử lý ảnh...</p>
        </div>
      )}

      {/* TRẠNG THÁI 1: CHƯA CÓ ẢNH */}
      {!currentImageUrl && !isLoading && (
        <div className='flex flex-col items-center justify-center gap-4 p-8 text-(--description)'>
          <ImageIcon size={64} strokeWidth={1.5}/>
          <p className='text-lg font-medium text-(--description)'>
            Chưa có hình ảnh
          </p>
          <Button
            onClick={triggerFileInput}
            variant='primary'
            className='gap-2 flex'
          >
            <Upload size={16}/>
            Tải ảnh lên
          </Button>
        </div>
      )}

      {/* TRẠNG THÁI 2: ĐÃ CÓ ẢNH VÀ ĐƯỢC HOVER */}
      {currentImageUrl && isHovered && !isLoading && (
        <div className='absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 z-10'>
          <Button
            variant='primary'
            onClick={triggerFileInput}
            className='gap-2 flex'
          >
            <Upload size={16}/>
            Thay đổi ảnh
          </Button>
          <Button
            onClick={handleRemoveImage}
            variant='red'
            className='flex gap-2'
          >
            <X size={16}/>
            Xoá ảnh
          </Button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload