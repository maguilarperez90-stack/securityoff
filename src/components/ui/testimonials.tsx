import { Card, CardContent, CardHeader } from '@/src/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { motion } from 'motion/react'

export default function Testimonials() {
    return (
        <section className="py-24 md:py-40 bg-background relative overflow-hidden" id="testimonios">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="mx-auto max-w-6xl space-y-12 px-6 md:space-y-20 relative z-10">
                <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center md:space-y-8">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl uppercase italic"
                    >
                      Casos de <span className="text-primary">Éxito</span>
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-muted-foreground text-sm font-mono uppercase tracking-widest"
                    >
                      Operaciones ejecutadas con precisión quirúrgica y resultados garantizados.
                    </motion.p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
                    <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2 bg-card/30 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Recuperación de Activos // Nivel Alfa</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-8">
                                <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed">
                                  "Tras el ataque de ransomware, SECURITY.OFF no solo recuperó nuestra Base de Datos crítica en menos de 12 horas, sino que rastreó el origen hasta la wallet del atacante. Su intervención fue la diferencia entre la quiebra y la continuidad operativa."
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-t border-primary/10 pt-6">
                                    <Avatar className="size-14 border border-primary/20">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&auto=format&fit=crop"
                                            alt="Marcus V."
                                            loading="lazy"
                                        />
                                        <AvatarFallback>MV</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <cite className="text-sm font-bold uppercase tracking-tight text-foreground not-italic">Marcus V.</cite>
                                        <span className="text-primary block text-[10px] font-mono uppercase tracking-widest">CTO // Global Fintech Corp</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 bg-card/30 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all">
                        <CardContent className="h-full pt-8">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-lg font-medium text-foreground/90">
                                  "La auditoría de identidad digital expuso vulnerabilidades que nuestro equipo interno ignoraba. Limpiaron nuestra huella digital en la Dark Web de manera profesional y discreta."
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12 border border-primary/20">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&auto=format&fit=crop"
                                            alt="Elena R."
                                            loading="lazy"
                                        />
                                        <AvatarFallback>ER</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-bold uppercase tracking-tight text-foreground not-italic">Elena R.</cite>
                                        <span className="text-primary block text-[10px] font-mono uppercase tracking-widest">Director de Seguridad // Crypto Vault</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/20 border-white/5">
                        <CardContent className="h-full pt-8">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-sm text-muted-foreground italic leading-relaxed">
                                  "Invisible, efectivo y letal contra las amenazas. El mejor servicio de contrainteligencia que existe."
                                </p>

                                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-10 grayscale">
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-xs font-bold uppercase text-foreground/80 not-italic">Anon.</cite>
                                        <span className="text-[8px] text-muted-foreground block uppercase tracking-tighter">Inversionista Privado</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/20 border-white/5">
                        <CardContent className="h-full pt-8">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-sm text-muted-foreground italic leading-relaxed">
                                  "Localización exacta de dispositivos perdidos fuera del alcance de la policía. Increíble."
                                </p>

                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-10 grayscale">
                                        <AvatarFallback>RA</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-foreground/80">R. Aguilar</p>
                                        <span className="text-[8px] text-muted-foreground block uppercase tracking-tighter">Analista Independiente</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
