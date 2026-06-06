import Image from "next/image";

/**
 * Renders project/room imagery.
 *
 * Until Denise's real photos are added, this shows an elegant placeholder so
 * the layout looks finished. Once photos are dropped into /public/images,
 * set IMAGES_READY = true below and every placeholder becomes a real,
 * optimized next/image automatically.
 */
export const IMAGES_READY = false;

const gradients = [
  "linear-gradient(135deg, #e7ddd1 0%, #c9b8a3 100%)",
  "linear-gradient(135deg, #ded3c4 0%, #b7a288 100%)",
  "linear-gradient(135deg, #efe7db 0%, #cbb89f 100%)",
  "linear-gradient(135deg, #e3d8c8 0%, #b9a487 100%)",
];

export function Frame({
  src,
  alt,
  label,
  index = 0,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  ready = IMAGES_READY,
}: {
  src: string;
  alt: string;
  label?: string;
  index?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Render the real image. Defaults to the global IMAGES_READY flag, but can
   *  be set per-image so real photos show while others stay placeholders. */
  ready?: boolean;
}) {
  if (ready) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-soft hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: gradients[index % gradients.length] }}
      role="img"
      aria-label={alt}
    >
      {label && (
        <span className="px-4 text-center font-serif text-lg text-ink/45">
          {label}
        </span>
      )}
      <span className="pointer-events-none absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-ink/30">
        photo
      </span>
    </div>
  );
}
