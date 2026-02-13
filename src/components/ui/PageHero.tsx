import SectionLabel from "./SectionLabel";

interface PageHeroProps {
  label?: string;
  labelColor?: "red" | "gold" | "muted";
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  accent?: "red" | "gold" | "none";
}

export default function PageHero({
  label,
  labelColor = "gold",
  title,
  subtitle,
  children,
  accent = "red",
}: PageHeroProps) {
  const bgGradient =
    accent === "red"
      ? "radial-gradient(ellipse at 50% 0%, rgba(145,0,0,0.15) 0%, transparent 60%)"
      : accent === "gold"
        ? "radial-gradient(ellipse at 50% 0%, rgba(196,162,101,0.12) 0%, transparent 60%)"
        : "none";

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 pb-16 pt-24 text-center sm:pb-20 sm:pt-32"
      style={{ background: bgGradient }}
    >
      {label && (
        <div className="mb-4">
          <SectionLabel color={labelColor}>{label}</SectionLabel>
        </div>
      )}
      <h1 className="text-display text-foreground">{title}</h1>
      {subtitle && (
        <p className="text-body mt-4 max-w-2xl text-base">{subtitle}</p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}
