import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Button  from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, X, Loader2, FileText } from "lucide-react";

import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

export interface PDFPreviewRef {
  generatePreview: (element: HTMLElement) => Promise<void>;
}

interface PDFPreviewDialogProps {
  fileName?: string;
}

export const PDFPreviewDialog = forwardRef<PDFPreviewRef, PDFPreviewDialogProps>(
  ({ fileName = 'document.pdf' }, ref) => {
    const [open, setOpen] = useState(false);
    const [pdfPreview, setPdfPreview] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [zoom, setZoom] = useState(100);
    const [pageCount, setPageCount] = useState(0);
    const [pdfDoc, setPdfDoc] = useState<jsPDF | null>(null);

    // Expose generatePreview function to parent
    useImperativeHandle(ref, () => ({
      generatePreview: async (element: HTMLElement) => {
        if (!element) {
          return;
        }
        setIsGenerating(true);
        setOpen(true);
        try {
          // Tạo image từ HTML element
          const dataUrl = await htmlToImage.toPng(element, {
            // truyền data vào và chụp
            quality: 1,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
            cacheBust: true,
            style: {
              // Override các style có thể gây lỗi
              transform: 'none',
              margin: '0',
            },
            filter: (node) => {
              // Loại bỏ các elements không cần thiết
              if (node.classList?.contains('no-print')) {
                return false;
              }
              return true;
            },
          });

          // Tạo image object để lấy kích thước
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = dataUrl;
          });

          // Create PDF
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
            compress: true,
          });

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = pdfWidth;
          const imgHeight = (img.height * pdfWidth) / img.width;

          let heightLeft = imgHeight;
          let position = 0;
          let pages = 1;

          // Thêm trang đầu tiên
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;

          // Thêm các trang tiếp theo nếu nội dung dài
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
            pages++;
          }

          setPageCount(pages);

          // Create preview URL
          const pdfBlob = pdf.output('blob');
          const pdfUrl = URL.createObjectURL(pdfBlob);

          setPdfPreview(pdfUrl);
          setPdfDoc(pdf);

        } catch (err) {
          console.error('Lỗi tạo PDF:', err);
        } finally {
          setIsGenerating(false);
        }
      }
    }));

    const handleDownload = () => {
      if (pdfDoc) {
        pdfDoc.save(fileName);
      }
    };

    const handleClose = () => {
      setOpen(false);
      if (pdfPreview) {
        URL.revokeObjectURL(pdfPreview);
        setPdfPreview(null);
      }
      setPdfDoc(null);
      setZoom(100);
    };

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-[95vw] w-[95vw] lg:max-w-[85vw] lg:w-[85vw] h-[95vh] p-0 flex flex-col bg-(--black) border-none">
          {/* Header */}
          <DialogHeader className="p-4 bg-(--description) flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-white text-sm font-normal flex items-center gap-2">
              <FileText size={18} className="text-(--primary-btn)" />
              {fileName} {pageCount > 0 && `(${pageCount} trang)`}
            </DialogTitle>
            {/* Toolbar */}
            <div className="flex items-center gap-2">
              {!isGenerating && (
                <>
                  <Button
                    size="small"
                    className="text-(--white) hover:bg-white/10"
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    disabled={zoom <= 50}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-(--white) text-sm min-w-15 text-center">
                    {zoom}%
                  </span>
                  <Button
                    size="small"
                    className="text-(--white) hover:bg-white/10"
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    disabled={zoom >= 200}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-white/20 mx-2" />
                  <Button
                    size="small"
                    className="text-(--white) hover:bg-white/10"
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </>
              )}

              <Button
                size="small"
                className="text-white hover:bg-white/10"
                onClick={handleClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* PDF Preview Area */}
          <div className="flex-1 w-full h-full relative overflow-hidden bg-(--white)">
            {isGenerating ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto text-(--white)" />
                  <p className="mt-4 text-sm text-white/70">
                    Đang tạo bản xem trước...
                  </p>
                </div>
              </div>
            ) : pdfPreview ? (
              <div className="flex justify-center items-start h-full p-4">
                <iframe
                  src={`${pdfPreview}#toolbar=0&navpanes=0&view=FitH`}
                  className="shadow-2xl"
                  style={{
                    width: `${zoom}%`,
                    height: '100%',
                    minHeight: '1000px',
                    border: 'none',
                  }}
                  title="PDF Preview"
                />
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

PDFPreviewDialog.displayName = 'PDFPreviewDialog';