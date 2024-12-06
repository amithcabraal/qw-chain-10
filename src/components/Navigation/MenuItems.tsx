import { Home, HelpCircle, History, Mail, Shield, Maximize, Cast } from 'lucide-react';
import { MenuItem } from './MenuItem';
import type { Page } from '../../types';

interface MenuItemsProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onClose: () => void;
  onFullscreen: () => void;
  onCast: () => void;
}

export function MenuItems({ currentPage, onPageChange, onClose, onFullscreen, onCast }: MenuItemsProps) {
  const menuItems = [
    { icon: Home, label: 'Home', page: 'game' as const },
    { icon: HelpCircle, label: 'How to Play', page: 'how-to-play' as const },
    { icon: History, label: 'Recent Games', page: 'history' as const },
    { icon: Mail, label: 'Contact Us', page: 'contact' as const },
    { icon: Shield, label: 'Privacy Policy', page: 'privacy' as const },
  ];

  const handlePageChange = (page: Page) => {
    onPageChange(page);
    onClose();
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    onFullscreen();
    onClose();
  };

  const handleCast = (e: React.MouseEvent) => {
    e.preventDefault();
    onCast();
    onClose();
  };

  return (
    <nav className="py-1 relative z-[100]">
      {menuItems.map((item) => (
        <MenuItem
          key={item.page}
          {...item}
          currentPage={currentPage}
          onClick={handlePageChange}
        />
      ))}
      
      <div className="border-t border-emerald-100 dark:border-emerald-800 my-1" />
      
      <button
        onClick={handleFullscreen}
        className="w-full px-4 py-2 text-left flex items-center gap-3 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 transition-colors"
      >
        <Maximize className="w-4 h-4" />
        Toggle Fullscreen
      </button>
      
      <button
        onClick={handleCast}
        className="w-full px-4 py-2 text-left flex items-center gap-3 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-800/50 transition-colors"
      >
        <Cast className="w-4 h-4" />
        Cast to TV
      </button>
    </nav>
  );
}