import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="section-pad flex flex-1 items-center py-24">
      <div className="container-page max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="display mt-3 text-5xl text-ink">Page not found</h1>
        <p className="mt-4 text-ink-soft">
          That route isn’t part of the Egypt Land Escapes MVP yet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/tours" variant="ghost">
            Browse tours
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          Or <Link href="/contact" className="text-nile">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
