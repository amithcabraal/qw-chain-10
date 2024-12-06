import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuButton } from './MenuButton';
import { MenuItems } from './MenuItems';
import { Toast } from '../Toast';
import { toggleFullscreen } from '../../utils/fullscreen';
import { initializeCasting, startCasting } from '../../utils/casting';
import type { Page } from '../../types';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeCasting().catch(console.error);
  }, []);

  const handleFullscreen = async () => {
    try {
      await toggleFullscreen();
    } catch (err) {
      setError('Fullscreen mode is not available in this browser');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleCast = async () => {
    try {
      await startCasting();
    } catch (err) {
      setError('Casting is not available in this browser');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <>
      <div className="relative z-50">
        <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-emerald-900 shadow-lg overflow-hidden"
            >
              <MenuItems
                currentPage={currentPage}
                onPageChange={onPageChange}
                onClose={() => setIsOpen(false)}
                onFullscreen={handleFullscreen}
                onCast={handleCast}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Toast
        message={error || ''}
        isVisible={!!error}
        onClose={() => setError(null)}
      />
    </>
  );
}