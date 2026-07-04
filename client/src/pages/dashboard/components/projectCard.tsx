import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui';
import { cardVariants } from '../../../types/CardVariants';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
    id: number;
    title: string;
    status: 'onWorking' | 'onFinishing' | 'onDelaying';
    img: string;
    lastUpdate?: string;
    className?: string
}

interface statusConfig {
    onWorking: {
        text: string;
        textClass: string;
        bgClass: string;
        dotClass: string;
    };
    onFinishing: {
        text: string;
        textClass: string;
        bgClass: string;
        dotClass: string;
    };
    onDelaying: {
        text: string;
        textClass: string;
        bgClass: string;
        dotClass: string;
    };
}

const statusConfig : statusConfig = {
    onWorking: {
        text: 'Đang hoạt động',
        textClass: 'text-blue-600 dark:text-blue-400',
        bgClass: 'bg-blue-50 dark:bg-blue-950/30 border border-blue-100/50 dark:border-blue-900/30',
        dotClass: 'bg-blue-500 animate-pulse',
    },
    onFinishing: {
        text: 'Đã hoàn thành',
        textClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/50 dark:border-emerald-900/30',
        dotClass: 'bg-emerald-500',
    },
    onDelaying: {
        text: 'Tạm dừng',
        textClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-100/50 dark:border-amber-900/30',
        dotClass: 'bg-amber-500',
    }
}

export default function ProjectCard({
    id,
    title,
    status,
    lastUpdate,
    img,
    // className,
    ...passProps
} : ProjectCardProps)  {

    const props = {...passProps}
    const currentStatus = statusConfig[status || 'onWorking'];

    return (
        <Link to={`/projects/${id}`} className="block group">
            <motion.div 
                className="double-bezel-outer hover:scale-[1.01] transition-premium cursor-pointer" 
                {...props}
                variants={cardVariants}
            >
                <div className="double-bezel-inner p-4 space-y-4 flex flex-col justify-between h-full min-h-[320px]">
                    {/* Image Container with hover zoom */}
                    <div className="relative w-full pb-[60%] bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
                        <Image 
                            src={img} 
                            alt={title} 
                            className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                        />
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-2 text-start">
                            <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">{title}</h3>
                            <div>
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${currentStatus.bgClass} ${currentStatus.textClass}`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${currentStatus.dotClass}`} />
                                    {currentStatus.text}
                                </span>
                            </div>
                        </div>

                        {/* Footer info */}
                        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                            {lastUpdate ? (
                                <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{lastUpdate}</span>
                                </div>
                            ) : (
                                <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">Xem chi tiết dự án</div>
                            )}
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-800 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

