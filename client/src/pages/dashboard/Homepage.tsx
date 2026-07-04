import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import StatCard from './components/statCard';
import ProjectCard from './components/projectCard';

import { Folder, Activity, CheckCircle2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import FadedDiv from '../../components/ui/FadedDiv';
import { PageTransition } from '@/components/animated';
import { useAuth } from '@/hooks/useAuth';
import { useGetProjectsByUserId } from '@/hooks/useProject';

const HomePage: React.FC = () => {

  const { profile } = useAuth()
  const user = profile.data?.data
  const { data:projects, isPending, isError } = useGetProjectsByUserId(Number(user.id || 0))
  const [currentPage, setCurrentPage] = useState<number>(1)

  if (isPending) return <h2 className="p-6 text-center text-(--description)">Đang tải dữ liệu...</h2>
  if (isError) return <h2 className="p-6 text-center text-(--error)">Có lỗi xảy ra vui lòng thử lại!</h2>

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => !p.finishAt).length;
  const finishedProjects = projects.filter(p => p.finishAt).length; 

  const overviewStats = [
    { 
      title: 'Tổng số dự án', 
      value: totalProjects, 
      description: 'Số lượng dự án bạn đang đăng ký',
      icon: Folder, 
      color: 'navy' as const
    },
    { 
      title: 'Dự án đang hoạt động', 
      value: activeProjects,
      description: 'Số dự án hiện đang được tiến hành',
      icon: Activity, 
      color: 'blue' as const
    },
    { 
      title: 'Dự án hoàn thành', 
      value: finishedProjects, 
      description: 'Dự án đã hoàn thành',
      icon: CheckCircle2, 
      color: 'green' as const
    },
  ];

  const ITEMS_PER_PAGE = 3
  const totalPages = Math.ceil((projects?.length || 0) / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexofFirstItem = indexOfLastItem - ITEMS_PER_PAGE

  const currentProjects = projects?.slice(indexofFirstItem, indexOfLastItem) || [];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <PageTransition>
      <div className='space-y-10 max-w-7xl mx-auto px-2'>
          {/* 1. Welcome Panel */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-100/50 dark:border-blue-900/30 bg-linear-to-br from-blue-500/10 via-indigo-500/5 to-transparent p-8 text-start space-y-4 shadow-sm">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <Sparkles className="h-3 w-3" /> Risk Analysis
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-955 dark:text-white tracking-tight">
                  Xin chào, <span className="text-blue-500">{user.name}</span>
              </h1>
              
              <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed max-w-xl">
                  Chào mừng bạn trở lại hệ thống <span className="font-bold text-blue-500">Risk Management</span>. Bắt đầu nhận diện, phân tích và giảm thiểu các rủi ro để bảo vệ an toàn cho dự án của bạn ngay hôm nay.
              </p>
          </div>

          {/* 2. Khối "Tổng quan dự án của tôi" */}
          <div className="space-y-4">
              <div className='flex items-end justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-3'>
                <div className="space-y-1 text-start">
                  <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">Tổng quan dự án của tôi</h2>
                </div>
                <Link to='/projects' className='text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors'>Xem chi tiết</Link>
              </div>
              <FadedDiv className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {overviewStats.map(({title, value, description, icon, color}, index) => (
                    <StatCard key={index} title={title} value={value} description={description} icon={icon} color={color} />
                  ))} 
              </FadedDiv>
          </div>

          {/* 3. Khối "Dự án gần đây" */}
          <div className="space-y-4">
              <div className="border-b border-neutral-100 dark:border-neutral-800/80 pb-3 text-start">
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">Dự án gần đây</h2>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {currentProjects?.map((project) => (
                  <FadedDiv key={project.id}>
                    <ProjectCard id={project.id} title={project.name} status={project.finishAt ? 'onFinishing' : 'onWorking'} img={project.backgroundImageUrl || 'default_image.png'}/>
                  </FadedDiv>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 py-2">
                  {/* Nút Prev */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-600 dark:text-neutral-400"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Các nút số trang */}
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        currentPage === page
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/25 scale-105" 
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Nút Next */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-600 dark:text-neutral-400"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
          </div>
      </div>
    </PageTransition>
  );
};

export default HomePage