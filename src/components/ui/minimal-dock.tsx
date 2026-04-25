'use client'
import React, { useState } from 'react';
import { Home, Shield, Terminal, Search, Lock, Mail, MessageSquare, Palette } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
}

const dockItems: DockItem[] = [
  { id: 'home', icon: <Home size={18} />, label: 'Inicio', href: '#inicio' },
  { id: 'services', icon: <Shield size={18} />, label: 'Servicios', href: '#servicios' },
  { id: 'terminal', icon: <Terminal size={18} />, label: 'Consola', href: '#terminal' },
  { id: 'search', icon: <Search size={18} />, label: 'Búsqueda', href: '#darkweb' },
  { id: 'testimonials', icon: <MessageSquare size={18} />, label: 'Testimonios', href: '#testimonios' },
  { id: 'personalize', icon: <Palette size={18} />, label: 'Estilo', href: '#personalizar' },
  { id: 'vault', icon: <Lock size={18} />, label: 'Bóveda', href: '#pricing' },
  { id: 'contact', icon: <Mail size={18} />, label: 'Contacto', href: '#contacto' },
];

export function MinimalistDock() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-4 w-full flex justify-center pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto"
      >
        <div className={cn(
          "flex items-end gap-2 px-4 py-3 rounded-2xl",
          "bg-card/40 backdrop-blur-2xl border border-border/20 shadow-2xl shadow-black/50",
          "transition-all duration-500 ease-out"
        )}>
          {dockItems.map((item) => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-primary/20 text-white text-[10px] font-mono uppercase tracking-widest whitespace-nowrap z-50"
                  >
                    {item.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-primary/20 rotate-45 -translate-y-1"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ease-out overflow-hidden group/item",
                  hoveredItem === item.id 
                    ? "bg-primary/20 border-primary/40 -translate-y-2 scale-110 shadow-lg shadow-primary/10" 
                    : "bg-white/5 border-white/5 border hover:bg-white/10 hover:-translate-y-1"
                )}
              >
                <div className={cn(
                  "transition-all duration-300",
                  hoveredItem === item.id ? "text-primary scale-110" : "text-muted-foreground"
                )}>
                  {item.icon}
                </div>
                
                {/* Active Indicator bar */}
                <motion.div 
                   className="absolute bottom-1 w-1 h-0.5 bg-primary rounded-full"
                   animate={{ opacity: hoveredItem === item.id ? 1 : 0, scale: hoveredItem === item.id ? 1 : 0 }}
                />
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
