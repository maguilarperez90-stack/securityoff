import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Terminal, 
  Database, 
  Search, 
  Fingerprint, 
  Zap, 
  Lock, 
  Eye, 
  Map,
  MapPin, 
  Cpu, 
  Globe, 
  Activity,
  AlertTriangle,
  ChevronRight,
  User,
  Smartphone,
  Server,
  Key,
  ShieldCheck,
  Send,
  Skull,
  Ghost,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { SplineScene } from "./components/ui/splite";
import { Card } from "./components/ui/card";
import { Spotlight } from "./components/ui/spotlight";
import { Entropy } from "./components/ui/entropy";
import { ShaderAnimation } from "./components/ui/shader-animation";
import SearchComponent from "./components/ui/animated-glowing-search-bar";
import { CustomCursor } from "./components/ui/custom-cursor";
import { MinimalistDock } from "./components/ui/minimal-dock";
import Testimonials from "./components/ui/testimonials";

const SESSION_ID = "0577a3255eb1792ceaaad801a7e4b0edf1773a970af10f6e91916efaca44ae5a4f";
const EMERGENCY_URL = "https://youtu.be/dQw4w9WgXcQ?si=QsReTq8YYbmyLQcj";

// --- Hooks ---

const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
};

const useEmergencyRedirect = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.location.href = EMERGENCY_URL;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerEmergency = () => {
    window.location.href = EMERGENCY_URL;
  };

  return { triggerEmergency };
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { triggerEmergency } = useEmergencyRedirect();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer relative">
          <div className="w-10 h-10 relative overflow-hidden rounded-xl border border-primary/30">
            <ShaderAnimation className="w-full h-full scale-150" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Terminal className="text-foreground w-4 h-4 z-10" />
            </div>
          </div>
          <div className="flex flex-col">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-lg font-extrabold tracking-tight font-sans leading-none flex items-center gap-1 group"
            >
              SECURITY.<span className="text-primary italic transition-all group-hover:drop-shadow-[0_0_8px_rgba(52,168,90,0.8)]">OFF</span>
            </motion.span>
            <span className="text-[7px] text-muted-foreground uppercase tracking-[0.4em] font-black">Inteligencia Avanzada</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-widest uppercase">
          <a href="#inicio" className="hover:text-primary transition-colors">Inicio</a>
          <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
          <a href="#darkweb" className="hover:text-primary transition-colors">Datos</a>
          <button 
            onClick={triggerEmergency} 
            className="px-4 py-2 border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all rounded-lg flex items-center gap-2 group"
          >
            <Skull className="w-3 h-3 group-hover:animate-bounce" />
            PANIC (ESC)
          </button>
          <div className="hidden lg:flex items-center gap-4 text-[8px] font-mono border-l border-border pl-8 ml-4">
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase tracking-tighter">Node</span>
              <span className="text-primary uppercase tracking-tighter">GLOBAL-01</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase tracking-tighter">Status</span>
              <div className="flex items-center gap-1">
                 <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                 <span className="text-primary uppercase tracking-tighter">Online</span>
              </div>
            </div>
          </div>
          <a href="#contacto" className="px-6 py-2.5 bg-primary text-primary-foreground hover:brightness-110 transition-all rounded-lg font-bold shadow-lg shadow-primary/20">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
};

const TerminalSimulator = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialLog = [
    "> CONECTANDO AL SERVIDOR VULT DE SECURITY_OFF...",
    "> ENLACE SEGURO ABIERTO. TLS 1.3 ACTIVADO.",
    "> CIFRANDO SESIÓN ACTUAL...",
    "> ACCESO CONCEDIDO: PROTOCOLO_HACKER_CARGADO",
    "> ESCANEANDO CAPAS DE RED LOCAL...",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < initialLog.length) {
        setLines(prev => [...prev, initialLog[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsScanning(true), 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isScanning) {
      const scanLogs = [
        `> RASTREANDO IP OBJETIVO: NODO_INTERNO_99`,
        `> FILTRACIÓN DETECTADA: [BUSCANDO...]`,
        `> ENCONTRADO: 4.2B REGISTROS EN BRECHA RECIENTE`,
        `> CRUCE DE DATOS CON DB DE DARK WEB...`,
        `> COINCIDENCIA HALLADA: IDENTIDAD_VULNERABLE`,
        `> RECOMENDACIÓN: COMUNICACIONES SEGURAS`,
      ];
      let j = 0;
      const scanInterval = setInterval(() => {
        if (j < scanLogs.length) {
          setLines(prev => [...prev, scanLogs[j]]);
          j++;
        } else {
          clearInterval(scanInterval);
        }
      }, 800);
      return () => clearInterval(scanInterval);
    }
  }, [isScanning]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border rounded-xl p-6 font-mono text-xs shadow-2xl relative overflow-hidden group min-h-[320px] preserve-3d transform-gpu">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/10 terminal-scan"></div>
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
        <div className="w-2 h-2 rounded-full bg-destructive/50"></div>
        <div className="w-2 h-2 rounded-full bg-secondary/50"></div>
        <div className="w-2 h-2 rounded-full bg-primary/50"></div>
        <span className="ml-2 text-[8px] text-muted-foreground tracking-widest uppercase">ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
      </div>
      <div ref={containerRef} className="space-y-1 h-[220px] overflow-y-auto overflow-x-hidden scrollbar-hide">
        {lines.map((line, idx) => (
          <div key={idx} className={`${line?.includes('DETECTED') || line?.includes('MATCH') ? 'text-primary font-bold' : 'text-foreground/70'} opacity-90`}>
            {line}
          </div>
        ))}
        {isScanning && (
          <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-3 bg-primary inline-block align-middle ml-1" />
        )}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <Activity className="w-3 h-3 text-primary/40 animate-pulse" />
        <span className="text-[8px] text-primary/40">SISTEMA_ACTIVO</span>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, description, icon: Icon, features, premium = false }: { title: string, description: string, icon: any, features: string[], premium?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className={`relative p-8 rounded-2xl border transition-all duration-300 transform-gpu perspective-1000 ${premium ? 'border-primary/40 bg-primary/5 group shadow-[0_0_40px_rgba(51,204,51,0.05)]' : 'border-border bg-card/50 hover:border-primary/40 group'}`}
    >
      <div className="mb-6 flex justify-between items-start">
        <div className={`p-4 rounded-xl bg-card border transition-colors ${premium ? 'border-primary shadow-[0_0_15px_rgba(51,204,51,0.2)]' : 'border-border group-hover:border-primary/50'}`}>
          <Icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${premium ? 'text-primary' : 'text-foreground'}`} />
        </div>
      </div>
      <h3 className={`text-xl font-black mb-4 tracking-tighter ${premium ? 'text-primary italic' : 'text-foreground'}`}>{title}</h3>
      <p className="text-muted-foreground text-xs leading-relaxed mb-8 h-12 overflow-hidden">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-[10px] tracking-wide font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase">
            <div className={`w-1 h-1 rounded-full ${premium ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
            {f}
          </li>
        ))}
      </ul>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`}></div>
    </motion.div>
  );
};

const ReportPreview = () => (
  <motion.div 
    initial={{ opacity: 0, rotateX: 20 }}
    whileInView={{ opacity: 1, rotateX: 0 }}
    viewport={{ once: true }}
    className="bg-black border border-white/10 rounded-sm p-8 relative overflow-hidden backdrop-blur-md shadow-2xl preserve-3d"
  >
    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary animate-pulse" />
        <span className="font-bold tracking-[0.4em] text-[9px] uppercase text-muted-foreground/40">SISTEMA_SEG // REPORTE_CIFRADO</span>
      </div>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
      </div>
    </div>

        <div className="space-y-8">
      <div>
        <h5 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
          <Fingerprint className="w-3 h-3" /> Perfil de Activo Investigado
        </h5>
        <div className="space-y-3 font-mono text-[9px] text-foreground/40 bg-muted/20 p-4 rounded-xl border border-border">
          <div className="flex justify-between border-b border-border pb-1">
            <span>ID_REAL:</span>
            <span className="blur-md select-none">M_AGUILAR_PEREZ_90</span>
          </div>
          <div className="flex justify-between border-b border-border pb-1">
            <span>GEOLOC:</span>
            <span className="blur-md select-none">NODO_MX_CENTRAL_CDMX</span>
          </div>
          <div className="flex justify-between">
            <span>HUELLA:</span>
            <span className="blur-md select-none">882:AF:01:99:CC</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.3em] mb-4">Filtraciones en Dark Web</h5>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map(i => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="h-10 bg-red-950/20 border border-red-500/20 rounded-sm flex items-center justify-center relative group/leak"
            >
              <AlertTriangle className="w-4 h-4 text-red-500/40 group-hover/leak:text-red-500 transition-colors" />
              <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover/leak:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <div className="absolute bottom-0 right-0 p-4 opacity-5 rotate-12">
      <Skull className="w-32 h-32 text-primary" />
    </div>
  </motion.div>
);

import RadialOrbitalTimeline, { TimelineItem } from "./components/ui/radial-orbital-timeline";

const securityServicesData: TimelineItem[] = [
  {
    id: 1,
    title: "Perfilado OSINT",
    date: "FASE_NÚCLEO",
    content: "Extracción masiva de datos en fuentes abiertas y filtraciones de la Dark Web para identificar al atacante original.",
    category: "Investigación",
    icon: Search,
    relatedIds: [2, 3],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Vínculo Vocal",
    date: "ACTIVO",
    content: "Identificación por patrones de comportamiento y metadatos de comunicación. Vinculamos identidades digitales con personas reales.",
    category: "Rastreo",
    icon: User,
    relatedIds: [1, 4],
    status: "in-progress",
    energy: 85,
  },
  {
    id: 3,
    title: "Geoloc Nodal",
    date: "TIEMPO_REAL",
    content: "Triangulación por nodos de ISP y metadatos de hardware para posicionar geográficamente el origen de la intrusión.",
    category: "Rastreo",
    icon: Map,
    relatedIds: [1, 5],
    status: "in-progress",
    energy: 92,
  },
  {
    id: 4,
    title: "Escudo Neural",
    date: "PROTECCIÓN",
    content: "Implementación de perímetros de defensa Zero-Trust para evitar que la identidad sea rastreada por terceros.",
    category: "Defensa",
    icon: Shield,
    relatedIds: [2, 5],
    status: "pending",
    energy: 40,
  },
  {
    id: 5,
    title: "Escaneo Profundo",
    date: "RECUPERACIÓN",
    content: "Análisis exhaustivo de dispositivos para detectar software de espionaje persistente (Pegasus/Predator) y su neutralización.",
    category: "Limpieza",
    icon: Eye,
    relatedIds: [3, 4],
    status: "pending",
    energy: 30,
  },
];

const ServiceSection = () => {
  return (
    <section className="py-32 bg-black overflow-hidden" id="servicios">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
                ECOSISTEMA DE <br />
                <span className="text-secondary italic">INTELIGENCIA.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Nuestro abanico de servicios opera como un sistema orbital. Cada nodo de inteligencia alimenta al siguiente, creando una red de protección inquebrantable.
              </p>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-4 pt-4"
              >
                {[
                  { title: "Interacción Nodal", desc: "Sistemas reactivos que se activan según la amenaza detectada." },
                  { title: "Protocolo 256-GCM", desc: "Cifrado de grado militar para el procesamiento de toda la información." },
                  { title: "Anonimato Total", desc: "No guardamos logs. La sesión se autodestruye tras la entrega del reporte." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className="flex gap-4 p-6 border border-border bg-card/30 rounded-xl group hover:border-primary/30 transition-all shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-sm mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <div className="space-y-8 relative">
             <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
             <div className="bg-card border border-border rounded-2xl p-4 relative overflow-hidden group/timeline shadow-xl">
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">SISTEMA NODAL INTERACTIVO</span>
                </div>
                <RadialOrbitalTimeline timelineData={securityServicesData} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-center">
                   <p className="text-[8px] font-bold text-muted-foreground/20 uppercase tracking-[0.6em]">Selecciona un nodo para ver interconexiones</p>
                </div>
             </div>
             <ReportPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

const LiveActivity = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `[${new Date().toLocaleTimeString()}] INCOMING_DATA_NODE_${Math.floor(Math.random() * 999)}: ${Math.random() > 0.5 ? 'HANDLED' : 'REDIRECTED'}`;
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-32 left-6 z-40 pointer-events-none md:block hidden">
      <div className="flex flex-col gap-1 border-l border-primary/20 pl-4">
        <span className="text-[7px] font-black tracking-[0.4em] text-primary/40 mb-2 uppercase">Canal de Datos en Vivo</span>
        {logs.map((log, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i} 
            className="text-[8px] font-mono text-muted-foreground/40 whitespace-nowrap"
          >
            {log}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const { mouseX, mouseY } = useMousePosition();
  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden bg-background" id="inicio">
      <div className="absolute inset-0 z-0">
         <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="rgba(52, 168, 90, 0.1)"
        />
        <motion.div 
          style={{ 
            left: spotlightX, 
            top: spotlightY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          className="fixed w-[800px] h-[800px] pointer-events-none rounded-full bg-primary/5 blur-[160px] z-0"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Card className="w-full bg-card/40 border-border backdrop-blur-xl overflow-hidden rounded-3xl group/hero-card shadow-2xl">
          <div className="flex flex-col lg:flex-row min-h-[700px]">
            {/* Left content */}
            <div className="flex-1 p-12 lg:p-20 relative z-10 flex flex-col justify-center border-r border-border">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-8 w-fit"
              >
                <Activity className="w-3 h-3 text-primary animate-pulse" />
                <span className="text-[9px] font-bold tracking-[0.4em] text-primary uppercase">Protocolo de Seguridad v2.0 Activo</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-foreground"
              >
                DIGITAL <br /> 
                <span className="gold-gradient italic">DEFENSE.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-muted-foreground text-base lg:text-lg max-w-lg mb-12 font-sans font-light leading-relaxed"
              >
                Intervenciones digitales de precisión milimétrica. Recuperación de activos y blindaje de infraestructuras críticas. 
                <span className="block mt-4 text-primary font-mono text-sm leading-tight border-l-2 border-primary/40 pl-4 uppercase tracking-tighter">
                  "Control absoluto sobre el entorno digital."
                </span>
              </motion.p>

              <div className="flex flex-wrap gap-6 overflow-hidden">
                <motion.a 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contacto" 
                  className="px-12 py-5 bg-primary text-primary-foreground font-black tracking-[0.2em] uppercase transition-all shadow-xl shadow-primary/20 rounded-xl"
                >
                  INICIAR PROTOCOLO
                </motion.a>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-16 flex items-center gap-10 opacity-40 group-hover/hero-card:opacity-60 transition-opacity"
              >
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground">Latencia</span>
                    <span className="text-xs font-mono text-secondary">8ms</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground">Cifrado</span>
                    <span className="text-xs font-mono text-secondary">ECC-384</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground">Estado</span>
                    <span className="text-xs font-mono text-secondary">PROTEGIDO</span>
                 </div>
              </motion.div>
            </div>

            {/* Right content - Spline 3D Scene */}
            <div className="flex-1 relative min-h-[400px] lg:min-h-0 bg-black/20">
              <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 z-10">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
              
              {/* Floating terminal overlay */}
              <div className="absolute bottom-8 right-8 z-30 w-72 hidden md:block">
                <TerminalSimulator />
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"></div>
        <span className="text-[8px] tracking-[1em] uppercase font-black text-foreground/40">Sigue Bajando</span>
      </div>
    </section>
  );
};

import { Pricing } from "./components/ui/single-pricing-card-1";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { triggerEmergency } = useEmergencyRedirect();

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-primary selection:text-primary-foreground text-foreground overflow-x-hidden">
      <CustomCursor />
      <LiveActivity />
      <MinimalistDock />
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <Hero />

      <ServiceSection />

      {/* Dark Web Section with Floating Elements */}
      <section className="py-40 bg-card/10 relative overflow-hidden border-y border-border" id="darkweb">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
           <Entropy size={1200} className="scale-125 translate-x-1/4" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-20 flex flex-col items-center">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-10"
             >
               <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
                 Darknet <span className="text-primary italic">Intelligence</span>
               </h2>
               <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                 Rastreamos más de 420 millones de registros filtrados para encontrar coincidencias de tu identidad digital.
               </p>
             </motion.div>
             <SearchComponent className="scale-125" />
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6 pb-12 overflow-visible">
                {[
                  { label: "Leads Obtenidos", val: "420M", icon: Database },
                  { label: "Nodos Rastreados", val: "1.2M", icon: Globe },
                  { label: "Archivos Cifrados", val: "88M", icon: Lock },
                  { label: "Tasa de Éxito", val: "99.9%", icon: Zap }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10, rotateZ: 2 }}
                    className="p-8 bg-card border border-border shadow-2xl relative group/stat overflow-hidden rounded-2xl"
                  >
                    <div className="absolute bottom-0 right-0 p-2 opacity-10">
                      <stat.icon className="w-12 h-12" />
                    </div>
                    <div className="text-3xl font-black font-mono text-primary mb-2">{stat.val}</div>
                    <div className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/40 font-bold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl lg:text-7xl font-black mb-12 uppercase leading-none italic">ACCESO <span className="text-secondary">TOTAL.</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 font-light">
                Transparencia radical en la obtención de datos. Operamos en los perímetros de información más complejos. Si sus datos han sido vulnerados, <span className="text-primary font-bold">nosotros tenemos la clave.</span>
              </p>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-20 h-1 bg-primary/30 group-hover:w-32 transition-all rounded-full"></div>
                <span className="text-xs font-bold tracking-[0.6em] uppercase text-primary">Explorar Protocolos</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Report Section */}
      <section className="py-40 border-t border-border bg-card/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
             <div className="lg:w-1/2">
                <h3 className="text-4xl lg:text-5xl font-black mb-10 leading-none uppercase">LA EVIDENCIA <br /><span className="text-secondary">INTEGRAL.</span></h3>
                <p className="text-muted-foreground text-base mb-12 leading-relaxed">
                  Basamos nuestras intervenciones en pruebas empíricas. Nuestros informes combinan análisis de red con inteligencia de señales para una respuesta definitiva. 
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-6 bg-card border border-border group hover:border-primary/30 transition-all cursor-crosshair rounded-xl shadow-lg">
                     <Ghost className="w-6 h-6 text-primary group-hover:animate-ping" />
                     <span className="text-[10px] font-black tracking-[0.4em] uppercase text-foreground/70">Extracción de Datos Protocolo Sombra</span>
                  </div>
                </div>
             </div>
             <div className="lg:w-1/2 w-full perspective-1000 flex justify-center">
                <div className="w-full max-w-lg transform hover:rotate-Y-[-10deg] transition-transform">
                  <ReportPreview />
                </div>
             </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <Pricing />

      {/* Contact Section */}
      <section className="py-32 relative bg-background overflow-hidden border-t border-border" id="contacto">
        <div className="absolute inset-0 z-0 opacity-30">
          <Entropy className="w-full h-full" size={800} />
        </div>
        <div className="container mx-auto px-6 text-foreground relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-7xl font-black tracking-tighter mb-10 leading-none uppercase">CONTACTO <br /><span className="text-primary italic">DIRECTO.</span></h2>
              <p className="text-muted-foreground text-lg mb-12 font-medium leading-relaxed max-w-md">
                Canales de comunicación seguros y descentralizados. Privacidad garantizada en cada interacción.
              </p>
              
              <div className="p-8 bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl relative group overflow-hidden">
                {/* Cybernetic Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40 rounded-br-lg"></div>
                
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Skull className="w-16 h-16 text-primary" />
                </div>
                <div className="text-[10px] uppercase font-bold text-primary tracking-[0.5em] mb-6 border-b border-border pb-4 flex justify-between items-center">
                  <span>Protocolo de Comunicación</span>
                  <Activity className="w-3 h-3 text-primary animate-pulse" />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-[9px] font-bold mb-3 text-muted-foreground uppercase tracking-widest italic">ID de Session App / Mensajería Cifrada:</div>
                    <div className="font-mono text-[11px] break-all bg-muted/50 p-5 rounded-xl text-primary border border-primary/10 hover:border-primary/40 transition-all select-all flex justify-between items-center gap-4">
                      {SESSION_ID}
                      <Zap className="w-4 h-4 shrink-0 animate-pulse text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-foreground/80">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span>Cifrado de Punto a Punto Habilitado.</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <button 
                   onClick={triggerEmergency}
                   className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-foreground/40 hover:text-destructive transition-colors group"
                >
                  <Skull className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
                  SISTEMA DE EMERGENCIA (ESC)
                </button>
              </div>
            </div>

            <motion.div 
               whileHover={{ scale: 1.01 }}
               className="bg-card text-foreground p-12 rounded-3xl shadow-2xl relative border border-border"
            >
              <div className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-br-xl"></div>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block">ID del Investigado</label>
                  <input 
                    type="text" 
                    placeholder="Alias o identificador digital..."
                    className="w-full bg-muted/20 border-b border-border px-0 py-4 text-foreground focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30 font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block">Detalles de la Solicitud</label>
                  <textarea 
                    placeholder="Describa el objetivo de la intervención..."
                    className="w-full bg-muted/20 border-b border-border px-0 py-4 text-foreground h-32 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30 font-mono text-sm resize-none"
                  ></textarea>
                </div>
                
                <motion.button 
                  whileHover={{ gap: "2rem" }}
                  className="w-full py-6 bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-4"
                >
                  TRANSMITIR DATOS <Send className="w-4 h-4" />
                </motion.button>
                
                <div className="pt-8 border-t border-border text-center">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-[0.6em] font-bold">Cifrado de Nodo: 256-GCM</div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-card overflow-hidden relative border-t border-border">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-10 gap-12 text-[10px] font-black tracking-[0.5em] text-muted-foreground/30 uppercase">
             <a href="#" className="hover:text-primary transition-colors">OSINT</a>
             <a href="#" className="hover:text-primary transition-colors">Neural</a>
             <a href="#" className="hover:text-primary transition-colors">Vult</a>
          </div>
          <div className="text-[10px] text-muted-foreground/30 font-mono uppercase tracking-[0.4em] flex flex-col md:flex-row justify-center items-center gap-4">
            <span>SECURITY.OFF // ELIMINACIÓN AUTOMÁTICA DE DATOS ACTIVA</span>
            <div className="w-1 h-1 rounded-full bg-primary/20 hidden md:block"></div>
            <span>ÚLTIMA_PURGA: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
