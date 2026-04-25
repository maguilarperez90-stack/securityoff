'use client';
import React from 'react';
import { PlusIcon, ShieldCheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/src/lib/utils';
import { BorderTrail } from './border-trail';

export function Pricing() {
	return (
		<section className="relative min-h-[70vh] overflow-hidden py-24 bg-transparent" id="pricing">
			<div className="mx-auto w-full max-w-6xl space-y-5 px-4 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: true }}
					className="mx-auto max-w-xl space-y-5"
				>
					<div className="flex justify-center">
						<div className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">Tarifas</div>
					</div>
					<h2 className="mt-5 text-center text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl text-foreground">
						ESTRUCTURA DE <span className="text-secondary italic">COSTOS.</span>
					</h2>
					<p className="text-muted-foreground mt-5 text-center text-sm md:text-base font-light max-w-lg mx-auto">
						Transparencia radical en cada operación. Diseñado para escalar con su infraestructura de seguridad.
					</p>
				</motion.div>

				<div className="relative mt-20">
					<div
						className={cn(
							'z-0 pointer-events-none absolute inset-0 size-full',
							'bg-[linear-gradient(to_right,rgba(52,168,90,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,168,90,0.05)_1px,transparent_1px)]',
							'bg-[size:48px:48px]',
							'[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent)]',
						)}
					/>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
						viewport={{ once: true }}
						className="mx-auto w-full max-w-4xl grid md:grid-cols-2 gap-8 relative z-10"
					>	
						<div className="bg-card/50 backdrop-blur-sm relative border border-border p-8 rounded-2xl group hover:border-primary transition-all duration-500">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-bold tracking-tight text-foreground">Estándar</h3>
									<Badge className="bg-secondary/10 text-secondary border-secondary/20 font-mono">-10%</Badge>
								</div>
								<p className="text-muted-foreground text-xs leading-relaxed">Configuración de nodo básico con análisis reactivo y reportes semanales.</p>
							</div>
							<div className="mt-12 space-y-6">
								<div className="text-muted-foreground flex items-end gap-1">
									<span className="font-mono text-lg">$</span>
									<span className="text-foreground text-5xl font-black tracking-tighter">
										149
									</span>
									<span className="text-[10px] uppercase font-bold tracking-widest pb-1 opacity-50">/SESIÓN</span>
								</div>
								<Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wide shadow-lg shadow-primary/20" asChild>
									<a href="#contacto">Solicitar Acceso</a>
								</Button>
							</div>
						</div>

						<div className="relative bg-card backdrop-blur-sm border-2 border-primary p-8 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden">
							<BorderTrail
								style={{
									boxShadow: '0px 0px 40px 15px rgba(52, 168, 90, 0.3)',
								}}
								size={120}
								className="bg-primary"
							/>
							<div className="relative z-10 space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
										Premium <Badge variant="secondary" className="text-[10px]">RECOMENDADO</Badge>
									</h3>
									<div className="flex items-center gap-x-1">
										<span className="text-muted-foreground/30 text-xs line-through font-mono">$399</span>
									</div>
								</div>
								<p className="text-muted-foreground text-xs leading-relaxed">Unidad de extracción profunda con IA dedicada y respuesta a incidentes 24/7.</p>
							</div>
							<div className="mt-12 space-y-6 relative z-10">
								<div className="text-primary flex items-end gap-1">
									<span className="font-mono text-lg">$</span>
									<span className="text-foreground text-5xl font-black tracking-tighter">
										299
									</span>
									<span className="text-[10px] uppercase font-bold tracking-widest pb-1 opacity-50">/SESIÓN</span>
								</div>
								<Button className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-sm tracking-wide" asChild>
									<a href="#contacto">Activar Nodo Central</a>
								</Button>
							</div>
						</div>
					</motion.div>

					<div className="text-muted-foreground/30 flex items-center justify-center gap-x-3 text-[9px] font-bold uppercase tracking-[0.3em] mt-12 bg-muted/20 py-2 inline-flex w-full rounded-full border border-border/10 max-w-sm mx-auto left-1/2 -translate-x-1/2 relative">
						<ShieldCheckIcon className="size-4 text-primary/40" />
						<span>Cifrado de grado militar en transacciones</span>
					</div>
				</div>
			</div>
		</section>
	);
}
