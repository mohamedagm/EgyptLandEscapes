import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/journal";
import { imageBlurDataUrl } from "@/data/media";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group block overflow-hidden rounded-[1.75rem] soft-panel transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(16,25,22,0.12)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL={imageBlurDataUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shade/50 via-transparent to-transparent" />
        <span className="badge-on-media absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
          {post.category}
        </span>
      </div>
      <div className="space-y-3 p-5 md:p-6">
        <div className="flex items-center gap-3 text-xs tracking-[0.12em] text-ink-soft uppercase">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-nile/40" />
          <span>{post.readTime}</span>
        </div>
        <h3 className="display text-2xl leading-snug text-ink transition group-hover:text-nile-deep">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <p className="text-xs font-semibold tracking-[0.14em] text-nile uppercase">
          Read article →
        </p>
      </div>
    </Link>
  );
}
