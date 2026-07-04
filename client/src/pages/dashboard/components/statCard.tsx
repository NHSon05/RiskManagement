import { motion } from "motion/react"
import { cardVariants } from "../../../types/CardVariants";
import { Link } from "react-router-dom";
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title?: string;
  value?: string | number;
  description?: string;
  icon: LucideIcon;
  color?: 'green' | 'blue' | 'orange' | 'navy';
  className?: string;
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    color,
    // className,
    ...passProps
} : StatCardProps) {

    const props = {...passProps}
    
    const colorTheme = {
      blue: {
        text: 'text-blue-500 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
      },
      green: {
        text: 'text-emerald-500 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      },
      orange: {
        text: 'text-amber-500 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-950/30',
      },
      navy: {
        text: 'text-indigo-500 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      }
    }[color || 'blue'];

    return (
      <Link to='/projects' className="block">      
        <motion.div 
          className="bg-white shadow-lg rounded-xl hover:scale-[1.02] transition-premium cursor-pointer group" 
          {...props} 
          variants={cardVariants}
        >
          <div className="p-6 flex justify-between items-start">
            <div className="text-start space-y-2">
              <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{title}</p>
              <p className="text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">{value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{description}</p>
            </div>
            <div className={`p-3 rounded-2xl ${colorTheme.text} transition-all duration-300 group-hover:scale-110`}>
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>
      </Link>
    )
}

export default StatCard