"use client";

import * as React from "react"

import { useEffect, useRef, useState } from "react";
import { Slider } from "@/src/components/ui/slider";
import { DIcons } from "dicons";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch"; 
import { cn } from "@/src/lib/utils";

type ColorStop = {
  color: string;
  position: number;
};

const defaultColorStops: ColorStop[] = [
  { color: "#34a85a", position: 0 },
  { color: "#000000", position: 100 },
];

export function GradientGenerator() {
  const [colorStops, setColorStops] = useState<ColorStop[]>(defaultColorStops);
  const [angle, setAngle] = useState(90);
  const [noiseAmount, setNoiseAmount] = useState(0);
  const [applyNoise, setApplyNoise] = useState(false);
  const [isRadialGradient, setIsRadialGradient] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  const gradientString = colorStops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  const gradientStyle = {
    background: !isRadialGradient
      ? `linear-gradient(${angle}deg, ${gradientString})`
      : `radial-gradient(circle, ${gradientString})`,
  };

  const gradientCSS = !isRadialGradient
    ? `background: linear-gradient(${angle}deg, ${gradientString});`
    : `background: radial-gradient(circle, ${gradientString});`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS).then(() => {
      // toast or notification could go here
    });
  };

  useEffect(() => {
    updateCanvas();
  }, [colorStops, angle, noiseAmount, applyNoise, isRadialGradient]);

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (canvas && displayCanvas) {
      const ctx = canvas.getContext("2d");
      const displayCtx = displayCanvas.getContext("2d");
      if (ctx && displayCtx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let gradient;
        if (!isRadialGradient) {
            // Correct linear gradient calculation for canvas based on angle
            const angleRad = (angle - 90) * (Math.PI / 180);
            const x1 = canvas.width / 2 - (Math.cos(angleRad) * canvas.width) / 2;
            const y1 = canvas.height / 2 - (Math.sin(angleRad) * canvas.height) / 2;
            const x2 = canvas.width / 2 + (Math.cos(angleRad) * canvas.width) / 2;
            const y2 = canvas.height / 2 + (Math.sin(angleRad) * canvas.height) / 2;
            gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        } else {
          gradient = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2,
          );
        }

        colorStops.forEach((stop) => {
          gradient.addColorStop(stop.position / 100, stop.color);
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (applyNoise) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * noiseAmount;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
          }
          ctx.putImageData(imageData, 0, 0);
        }

        displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
        displayCtx.drawImage(
          canvas,
          0,
          0,
          displayCanvas.width,
          displayCanvas.height,
        );
      }
    }
  };

  const downloadJPG = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.download = "security_off_gradient.jpg";
      link.href = dataURL;
      link.click();
    }
  };

  const addColorStop = () => {
    if (colorStops.length < 5) {
      const newPosition = Math.round(
        (colorStops[colorStops.length - 1].position + colorStops[0].position) /
          2,
      );
      setColorStops([
        ...colorStops,
        { color: "#34a85a", position: newPosition },
      ]);
    }
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
    }
  };

  const updateColorStop = (index: number, color: string, position: number) => {
    const newColorStops = [...colorStops];
    newColorStops[index] = { color, position };
    const sorted = [...newColorStops].sort((a, b) => a.position - b.position);
    setColorStops(sorted);
  };

  const resetSettings = () => {
    setColorStops(defaultColorStops);
    setAngle(90);
    setNoiseAmount(0);
    setApplyNoise(false);
    setIsRadialGradient(false);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="mx-auto w-full max-w-4xl space-y-4 rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden group/gen">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/40 rounded-tl"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/40 rounded-br"></div>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="relative group/canvas">
            <div
              className="aspect-square h-full w-full min-w-[280px] rounded-xl border border-white/10 overflow-hidden shadow-inner"
              style={gradientStyle}
            ></div>
            <canvas
              ref={displayCanvasRef}
              width={1000}
              height={1000}
              className="absolute left-0 top-0 aspect-square h-full w-full rounded-xl mix-blend-overlay opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-xl"></div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <Label className="text-[10px] uppercase font-mono tracking-[0.3em] text-primary">Paleta de Colores</Label>
              <div className="flex flex-wrap items-center gap-3">
                {colorStops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
                    <div className="relative flex items-center">
                      <div
                        className="size-8 cursor-pointer rounded-md border border-white/20 shadow-sm"
                        style={{ backgroundColor: stop.color }}
                      />
                      <Input
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        type="color"
                        value={stop.color}
                        onChange={(e) =>
                          updateColorStop(index, e.target.value, stop.position)
                        }
                      />
                    </div>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) =>
                        updateColorStop(index, stop.color, Number(e.target.value))
                      }
                      className="w-12 h-8 text-[10px] bg-transparent border-none font-mono focus-visible:ring-0"
                    />
                    {colorStops.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/20 text-muted-foreground hover:text-red-400"
                        onClick={() => removeColorStop(index)}
                      >
                        <DIcons.Minus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
                {colorStops.length < 5 && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 border-dashed border-primary/40 hover:bg-primary/10"
                    onClick={addColorStop}
                  >
                    <DIcons.Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-[10px] uppercase font-mono tracking-[0.3em] text-primary">Tipo de Gradiente</Label>
                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className={cn("text-[10px] font-mono", !isRadialGradient ? "text-primary" : "text-muted-foreground")}>LINEAR</span>
                  <Switch
                    checked={isRadialGradient}
                    onCheckedChange={(checked) => setIsRadialGradient(checked)}
                  />
                  <span className={cn("text-[10px] font-mono", isRadialGradient ? "text-primary" : "text-muted-foreground")}>RADIAL</span>
                </div>
              </div>

              {!isRadialGradient && (
                <div className="space-y-4">
                  <Label className="text-[10px] uppercase font-mono tracking-[0.3em] text-primary">Dirección ({angle}°)</Label>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 h-[50px] flex items-center">
                    <Slider
                      value={[angle]}
                      min={0}
                      max={360}
                      className="w-full"
                      onValueChange={(value) => setAngle(Number(value))}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] uppercase font-mono tracking-[0.3em] text-primary">Filtro de Grano / Ruido</Label>
                <Switch
                  checked={applyNoise}
                  onCheckedChange={setApplyNoise}
                />
              </div>
              {applyNoise && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                   <Slider
                    min={0}
                    max={200}
                    value={[noiseAmount]}
                    className="flex-1"
                    onValueChange={(value) => setNoiseAmount(Number(value))}
                  />
                  <span className="text-[10px] font-mono text-primary w-8 text-right">{noiseAmount}</span>
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  value={gradientCSS}
                  readOnly
                  className="h-10 text-[9px] bg-black/60 border-primary/20 font-mono pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10 hover:text-primary transition-colors"
                  onClick={copyToClipboard}
                >
                  <DIcons.Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={downloadJPG} className="h-10 text-[10px] font-mono uppercase tracking-widest gap-2">
                <DIcons.RotateCw className="w-3 h-3 group-active:rotate-180 transition-transform" />
                Exportar JPG
              </Button>
              <Button
                size="icon"
                onClick={resetSettings}
                variant="secondary"
                className="h-10 w-10"
              >
                <DIcons.RotateCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width="1000"
        height="1000"
        style={{ display: "none" }}
      />
    </div>
  );
}
