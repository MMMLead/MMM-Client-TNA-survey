import { motion } from "motion/react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 ${className}`}
  >
    {children}
  </motion.div>
);

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const variants = {
    primary: "bg-brand-orange text-white hover:opacity-90 disabled:bg-brand-orange/50",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:bg-slate-50",
    outline: "border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 rounded-full font-bold transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider text-sm ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = total > 0 ? Math.min(Math.max(((current + 1) / total) * 100, 0), 100) : 0;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end px-1">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</p>
          <p className="text-sm font-black text-brand-teal">
            Step {current + 1} <span className="text-slate-300 font-medium">of</span> {total}
          </p>
        </div>
        <span className="text-xs font-bold text-slate-500 tabular-nums bg-slate-100 px-2 py-0.5 rounded-md">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50 p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="bg-gradient-to-r from-brand-teal to-brand-teal/80 h-full rounded-full shadow-[0_0_10px_rgba(45,156,155,0.3)]"
        />
      </div>
    </div>
  );
};
