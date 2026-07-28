import Image from "next/image";

// Real product screenshots in a browser-style frame.
//
// next/image handles the heavy lifting: it serves AVIF/WebP derivatives sized to
// the viewport and lazy-loads everything below the fold. Pass `priority` only for
// the hero shot, which is the LCP element.

export function Screenshot({
  image,
  priority = false,
  sizes = "(min-width: 1024px) 640px, 100vw",
  className = "",
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-white shadow-2xl shadow-ink/10 ring-1 ring-ink/5 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-canvas px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="h-auto w-full"
      />
    </figure>
  );
}

// A phone-framed screenshot for the mobile section.
export function PhoneShot({ image, sizes = "(min-width: 640px) 220px, 45vw", className = "" }) {
  return (
    <figure
      className={`relative mx-auto w-full max-w-[220px] rounded-[2rem] border border-ink/10 bg-ink p-2 shadow-2xl shadow-ink/25 ${className}`}
    >
      <div className="overflow-hidden rounded-[1.6rem] bg-canvas">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading="lazy"
          className="h-auto w-full"
        />
      </div>
    </figure>
  );
}
