import iso from '../../assets/imgs/ISO.png'
import building from '../../assets/imgs/DaNang.png';

import { Image } from '@/components/ui';
import { motion } from 'motion/react';
import { 
  Search, 
  Star, 
  FileText, 
  BarChart2, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { PageTransition } from '@/components/animated';
import HeroSection from './components/hero-section';

function LandingPage() {
    return (
      <PageTransition>
        <div className="w-full overflow-hidden bg-background text-foreground">
          {/* Hero Section */}
          <HeroSection />

          {/* Advantages of Projects - Bento Grid Section */}
          <div className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 backdrop-blur-sm">
                Quy trình tiêu chuẩn
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                Giải pháp <span className="text-blue-500">Quản trị rủi ro</span> toàn diện
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Hệ thống được thiết kế tối ưu dựa trên các phương pháp quản lý chuẩn quốc tế giúp bảo vệ và tối đa hóa giá trị cho dự án.
              </p>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
              {/* Card 1: Nhận diện rủi ro */}
              <motion.div
                className="double-bezel-outer hover:scale-[1.01] transition-premium cursor-pointer group lg:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="double-bezel-inner p-8 md:p-10 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-500 w-fit mb-6 transition-all duration-300 group-hover:scale-110">
                      <Search className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-blue-500 transition-colors">
                      Nhận diện rủi ro
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg text-start">
                      Xác định và phân loại các mối đe dọa tiềm ẩn đối với hoạt động, tài chính và danh tiếng của tổ chức một cách tự động, nhanh chóng và có chiều sâu.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {["Rủi ro vận hành", "Rủi ro tài chính", "Rủi ro công nghệ", "Rủi ro pháp lý"].map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-100 dark:border-neutral-700/50">
                        • {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Đề xuất giải pháp */}
              <motion.div
                className="double-bezel-outer hover:scale-[1.01] transition-premium cursor-pointer group lg:col-span-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="double-bezel-inner p-8 md:p-10 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 w-fit mb-6 transition-all duration-300 group-hover:scale-110">
                      <Star className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-amber-500 transition-colors">
                      Đề xuất giải pháp
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed text-start">
                      Thiết lập các kế hoạch hành động tối ưu để phòng ngừa, giảm thiểu hoặc chuyển giao các rủi ro đã xác định một cách hiệu quả.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400 gap-1.5 group-hover:gap-2.5 transition-all">
                    Xem chi tiết giải pháp <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Đánh giá & phân tích */}
              <motion.div
                className="double-bezel-outer hover:scale-[1.01] transition-premium cursor-pointer group lg:col-span-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="double-bezel-inner p-8 md:p-10 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-500 w-fit mb-6 transition-all duration-300 group-hover:scale-110">
                      <FileText className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-purple-500 transition-colors">
                      Đánh giá & phân tích
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed text-start">
                      Phân tích định lượng và định tính mức độ ảnh hưởng cùng tần suất xảy ra của rủi ro để đưa ra các xếp hạng ưu tiên chính xác.
                    </p>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-[10px] text-neutral-400 font-semibold uppercase">
                      <span>Mức độ nghiêm trọng</span>
                      <span className="text-purple-500 font-bold">82% High</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full w-[82%] transition-all duration-1000" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Theo dõi & báo cáo */}
              <motion.div
                className="double-bezel-outer hover:scale-[1.01] transition-premium cursor-pointer group lg:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="double-bezel-inner p-8 md:p-10 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 w-fit mb-6 transition-all duration-300 group-hover:scale-110">
                      <BarChart2 className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-500 transition-colors">
                      Theo dõi & báo cáo
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg text-start">
                      Giám sát liên tục trạng thái của các biện pháp kiểm soát và tự động gửi báo cáo trực quan cho ban quản trị theo thời gian thực.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                    <div className="text-start">
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Đã xử lý</div>
                      <div className="text-lg md:text-xl font-bold text-emerald-500">24/28</div>
                    </div>
                    <div className="text-start">
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Hiệu suất</div>
                      <div className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">92.4%</div>
                    </div>
                    <div className="text-start">
                      <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Trạng thái</div>
                      <div className="text-lg md:text-xl font-bold text-blue-500">Realtime</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Infomation about ISO 31000 Section */}
          <div className="relative py-24 bg-neutral-50 dark:bg-neutral-950/40 overflow-hidden grid-bg-pattern border-y border-neutral-200/40 dark:border-neutral-800/40">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image Column nested in a double-bezel */}
              <motion.div 
                className="flex items-center justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="double-bezel-outer rotate-1 hover:rotate-0 transition-premium shadow-2xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm max-w-md w-full">
                  <div className="double-bezel-inner overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 p-4 bg-white dark:bg-neutral-950 flex items-center justify-center">
                    <Image src={iso} alt="iso" className="w-full h-auto rounded-lg object-contain bg-white" />
                  </div>
                </div>
              </motion.div>

              {/* Text Column */}
              <motion.div 
                className="text-start flex flex-col justify-center space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 backdrop-blur-sm w-fit">
                  Khung chuẩn quốc tế
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  ISO 31000 : 2009
                  <span className="block text-lg md:text-xl font-normal text-neutral-500 dark:text-neutral-400 mt-3">
                    Tiêu chuẩn quốc tế về quản lý rủi ro
                  </span>
                </h2>
                <div className="w-16 bg-blue-500 rounded-full h-1 my-2" />
                
                <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  ISO 31000 là tiêu chuẩn quốc tế về quản lý rủi ro, được áp dụng rộng rãi cho mọi loại hình tổ chức và dự án. 
                  Tiêu chuẩn này đưa ra khung và nguyên tắc giúp doanh nghiệp nhận diện, phân tích, đánh giá, và xử lý rủi ro một cách có hệ thống. Nhờ đó, tổ chức có thể đưa ra quyết định tốt hơn, đảm bảo mục tiêu đạt được trong môi trường an toàn bền vững.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    "Quyết định dựa trên dữ liệu",
                    "Phòng ngừa chủ động",
                    "Tối ưu hóa nguồn lực kiểm soát",
                    "Cải tiến liên tục quy trình"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Section - Premium Glass Island Card */}
          <div
            className="relative min-h-[480px] flex items-center justify-center py-24 bg-center bg-cover overflow-hidden"
            style={{ backgroundImage: `url(${building})` }}
          >
            {/* Soft blurred background overlay */}
            <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]" />

            <div className="relative max-w-4xl mx-auto px-6 w-full z-10">
              <motion.div 
                className="rounded-[2.5rem] border border-white/10 bg-black/40 p-8 md:p-16 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center justify-center space-y-8"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                  Kết nối với chuyên gia
                </div>
                
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
                  Bạn cần hỗ trợ quản lý rủi ro dự án?
                  <span className="block text-sm md:text-lg lg:text-xl font-normal text-neutral-300 mt-4 leading-relaxed max-w-xl mx-auto">
                    Hãy để chúng tôi giúp bạn với các giải pháp quản lý rủi ro chuyên sâu, xây dựng hệ thống quy trình an toàn & bền vững.
                  </span>
                </h2>

                <div className="flex flex-wrap gap-4 justify-center pt-2">
                  <button
                    className="group relative inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    Liên hệ với chúng tôi
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  <button
                    className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 active:scale-[0.98] cursor-pointer"
                  >
                    Xem bảng giá
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
}

export default LandingPage;