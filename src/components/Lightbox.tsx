import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/lib/language";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: { en: string; bn: string };
}

interface LightboxProps {
  images: LightboxImage[];
  /** Currently visible image index, or null to close. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  lang: Lang;
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.4;

/**
 * Glass-themed lightbox with:
 *   - Keyboard nav (← → for prev/next, Esc to close, +/- to zoom, 0 to reset)
 *   - Wheel + pinch zoom (touch pinch via two-finger gesture)
 *   - Pan when zoomed (mouse drag)
 *   - Bilingual caption strip
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  lang,
}: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null,
  );
  const pinchRef = useRef<{ startDist: number; startZoom: number } | null>(null);

  const open = index !== null;
  const current = open ? images[index] : null;

  const reset = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Reset zoom whenever the image changes
  useEffect(() => {
    reset();
  }, [index, reset]);

  // Close on Esc / arrow keys / +,-,0
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onIndexChange((index! + 1) % images.length);
          break;
        case "ArrowLeft":
          onIndexChange((index! - 1 + images.length) % images.length);
          break;
        case "+":
        case "=":
          setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP));
          break;
        case "-":
          setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP));
          break;
        case "0":
          reset();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onClose, onIndexChange, reset]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => {
      const next = z - Math.sign(e.deltaY) * ZOOM_STEP;
      return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    });
  }, []);

  // Drag to pan when zoomed
  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.ox + (e.clientX - dragRef.current.x),
      y: dragRef.current.oy + (e.clientY - dragRef.current.y),
    });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  // Touch pinch zoom
  const distance = (touches: React.TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchRef.current = {
        startDist: distance(e.touches),
        startZoom: zoom,
      };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const ratio = distance(e.touches) / pinchRef.current.startDist;
      const next = pinchRef.current.startZoom * ratio;
      setZoom(Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next)));
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) pinchRef.current = null;
  };

  if (!open || !current) return null;

  const node = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={lang === "bn" ? "চিত্র দর্শক" : "Image viewer"}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-2xl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top bar */}
      <div className="pointer-events-auto flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="font-body-en text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
          {index! + 1} / {images.length}
        </div>
        <div className="flex items-center gap-2">
          <ToolButton
            label={lang === "bn" ? "ছোট" : "Zoom out"}
            onClick={() =>
              setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))
            }
          >
            −
          </ToolButton>
          <span className="font-body-en w-12 text-center text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
            {Math.round(zoom * 100)}%
          </span>
          <ToolButton
            label={lang === "bn" ? "বড়" : "Zoom in"}
            onClick={() =>
              setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))
            }
          >
            +
          </ToolButton>
          <ToolButton
            label={lang === "bn" ? "রিসেট" : "Reset"}
            onClick={reset}
          >
            ⟳
          </ToolButton>
          <ToolButton
            label={lang === "bn" ? "বন্ধ" : "Close"}
            onClick={onClose}
          >
            ✕
          </ToolButton>
        </div>
      </div>

      {/* Image stage */}
      <div
        ref={containerRef}
        className="relative flex flex-1 select-none items-center justify-center overflow-hidden"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={current.src}
          alt={current.alt}
          draggable={false}
          className="max-h-full max-w-full transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
            cursor: zoom > 1 ? "grab" : "zoom-in",
          }}
          onDoubleClick={() =>
            setZoom((z) => (z > 1 ? 1 : 2))
          }
        />

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <NavButton
              side="left"
              label={lang === "bn" ? "পূর্ববর্তী" : "Previous"}
              onClick={() =>
                onIndexChange((index! - 1 + images.length) % images.length)
              }
            />
            <NavButton
              side="right"
              label={lang === "bn" ? "পরবর্তী" : "Next"}
              onClick={() => onIndexChange((index! + 1) % images.length)}
            />
          </>
        )}
      </div>

      {/* Caption strip */}
      {current.caption && (
        <figcaption className="pointer-events-auto border-t border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
          <p
            lang="en"
            className="font-display-en font-display-en text-base text-white/90 sm:text-lg"
          >
            {current.caption.en}
          </p>
          <p
            lang="bn"
            className="font-display-bn mt-1 text-sm text-white/60 sm:text-base"
          >
            {current.caption.bn}
          </p>
        </figcaption>
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(node, document.body);
}

function ToolButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white/80 backdrop-blur-md transition hover:border-[#c9a84c] hover:bg-[#c9a84c]/15 hover:text-white"
    >
      {children}
    </button>
  );
}

function NavButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      } flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white/80 backdrop-blur-xl transition hover:scale-105 hover:border-[#c9a84c] hover:bg-[#c9a84c]/15 hover:text-white`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
