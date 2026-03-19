import {
  Dialog,
  DialogHeader,
  DialogImg,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "../button";
import { FileText } from "lucide-react";

interface PdfViewerProps {
  fileUrl: string; // Đường dẫn file PDF của bạn (ví dụ: /danh-sach-thanh-tich.pdf)
  fileName?: string;
}

export function PDFViewer({ fileUrl, fileName = "Xem trước tài liệu" }: PdfViewerProps) {
  return (
    <Dialog>
      {/* Nút bấm để mở bản xem trước */}
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 flex">
          <FileText size={16} />
          Tệp tham khảo
        </Button>
      </DialogTrigger>

      {/* Nội dung bản xem trước giống Google Drive */}
      <DialogImg className="max-w-[100vw] w-500 h-[95vh] p-0 flex flex-col bg-[#323639] border-none">
        {/* Thanh tiêu đề phía trên giống Drive */}
        <DialogHeader className="p-4 bg-[#202124] flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-white text-sm font-normal flex items-center gap-2">
            <FileText size={18} className="text-blue-400" />
            {fileName}
          </DialogTitle>
        </DialogHeader>

        {/* Vùng hiển thị nội dung PDF */}
        <div className="flex-1 w-full h-full relative overflow-hidden bg-[#595552]">
          <iframe
            src={`${fileUrl}#toolbar=1&view=FitH`} 
            className="w-full h-full border-none shadow-2xl"
            title="PDF Preview"
          />
        </div>
      </DialogImg>
    </Dialog>
  );
}