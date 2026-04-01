import clsx from "clsx";
import Image from "next/image";

interface StatCardProps {
  type: 'appointments' | 'pending' | 'cancelled';
  count: number;
  label: string;
  icon: string;
}

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  // Define the glow colors based on the type
  const glowStyles = {
    appointments: "hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] hover:border-yellow-400 active:shadow-[0_0_20px_rgba(255,215,0,0.8)]",
    pending: "hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] hover:border-blue-400 active:shadow-[0_0_20px_rgba(59,130,246,0.8)]",
    cancelled: "hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] hover:border-red-400 active:shadow-[0_0_20px_rgba(239,68,68,0.8)]",
  };

  return (
    <div className={`stat-card ${glowStyles[type]} transition-all duration-300 cursor-pointer border-2 border-transparent`}>
      <div className="flex items-center gap-4">
        <Image src={icon} height={32} width={32} alt={label} className="size-8 w-fit" />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};