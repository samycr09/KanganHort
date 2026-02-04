import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export function BackButton({ to, label = 'Back', className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 font text-orange-300 hover:text-gray-900 opacity-90 hover:opacity-100 transition-colors transition-opacity ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      {label}
    </button>
  );
}
