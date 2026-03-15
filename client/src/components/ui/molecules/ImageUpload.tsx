import { useRef, useState } from 'react'
import Input from '../input'
import { ImageIcon, Upload, X } from 'lucide-react'
import Button from '../button'

const ImageUpload = () => {

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')){
        alert('Vui lòng chọn file ảnh');
        return;
      }
      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước ảnh không được vượt quá 5MB")
        return;
      }
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }

  }

  const handleRemoveImage = () => {
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  }

  return (
    <div
      className={
        `h-[40vh] bg-center bg-cover flex items-center justify-center rounded-xl
        shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]
      `}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundColor: imageUrl ? 'transparent' : '#f3f4f6',
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
      />
      {/* Placeholder when don't have image */}
      {!imageUrl && (
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
      {/* Overlay khi hover (có ảnh) */}
      {imageUrl && isHovered && (
        <div className='inset-0 flex items-center justify-center gap-3 transition-opacity duration-300'>
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