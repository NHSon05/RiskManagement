import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Title,  } from '@/components/ui';
import StatCard from './components/statCard';
import ProjectCard from './components/projectCard';

// import images from '../../assets';
import { faChartSimple, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import FadedDiv from '../../components/ui/FadedDiv';
import { PageTransition } from '@/components/animated';
import { useAuth } from '@/hooks/useAuth';
import { useGetProjectsByUserId } from '@/hooks/useProject';

interface StatData {
  title: string;
  value: number;
  description: string;
  icon: IconProp;
  color: 'blue' | 'green' | 'navy';
}

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

  const overviewStats: StatData[] = [
    { 
      title: 'Tổng số dự án', 
      value: totalProjects, 
      description: 'Số lượng dự án bạn đang đăng ký',
      icon: faChartSimple, 
      color: 'navy'
    },
    { 
      title: 'Dự án đang hoạt động', 
      value: activeProjects,
      description: 'Số dự án hiện đang được tiến hành',
      icon: faCircleCheck, 
      color: 'blue' 
    },
    { 
      title: 'Dự án hoàn thành', 
      value: finishedProjects, 
      description: 'Dự án đã hoàn thành',
      icon: faCircleCheck, 
      color: 'green'
    },
  ];

  const ITEMS_PER_PAGE = 3
  // slice data
  const totalPages = Math.ceil((projects?.length || 0) / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexofFirstItem = indexOfLastItem - ITEMS_PER_PAGE

  const currentProjects = projects?.slice(indexofFirstItem, indexOfLastItem) || [];
  console.log(currentProjects)

  const handlePageChange = (pageNumber: number ) => {
    setCurrentPage(pageNumber)
  }
  return (
    <PageTransition>
      <div className='space-y-8'>
          <div className='bg-(--bg-search) text-start rounded-lg p-6 space-y-4'>
              <Title size='large' variant='dark'>Xin chào, {user.name}</Title>
              <p className='text-gray-800 text-[16px]'>
                  Chào mừng bạn đến với <span className='font-bold text-(--primary-btn)'>Risk Management</span>. 
                  Bắt đầu quản lý rủi ro của bạn một cách hiệu quả
              </p>
              {/* <Button variant="primary" size='medium' onClick={() => navigate('/projects/info')}>Thêm dự án</Button> */}
          </div>

          {/* 2. Khối "Tổng quan dự án của tôi" */}
          <div>
              <div className='flex items-center justify-between'>
                <Title variant='dark' size='medium' className='text-start'>Tổng quan dự án của tôi</Title>
                <Link to='/projects' className='text-(--primary-btn) hover:italic hover:cursor-pointer'>Xem thêm</Link>
              </div>
              <FadedDiv className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2'>
                  {overviewStats.map(({title, value, description, icon, color},index) => (
                    <StatCard key={index} title={title} value={value} description={description} icon={icon} color={color} />
                  ))} 
              </FadedDiv>
          </div>

          {/* 3. Khối "Dự án gần đây" */}
          <div>
              <Title variant='dark' size='medium' className='text-start'>Dự án gần đây</Title>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2'>
                {currentProjects?.map((project) => (
                  <FadedDiv key={project.id}>
                    <ProjectCard id={project.id} title={project.name} status={project.finishAt ? 'onFinishing' : 'onWorking'} img={project.backgroundImageUrl || 'default_image.png'}/>
                  </FadedDiv>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                  {/* Nút Prev */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-(--bg-search) transition-colors"
                  >
                    Trước
                  </button>

                  {/* Các nút số trang */}
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                        currentPage === page
                          ? "bg-(--primary-btn) text-white font-medium" 
                          : "hover:bg-(--primary-btn)"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Nút Next */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-(--bg-search) transition-colors"
                  >
                    Sau
                  </button>
                </div>
              )}
          </div>
      </div>
    </PageTransition>
  );
};

export default HomePage