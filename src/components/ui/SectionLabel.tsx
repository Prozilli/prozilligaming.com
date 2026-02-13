interface SectionLabelProps {
  children: React.ReactNode;
  color?: "red" | "gold" | "muted";
}

const colorMap = {
  red: "text-red",
  gold: "text-gold",
  muted: "text-muted",
};

export default function SectionLabel({
  children,
  color = "gold",
}: SectionLabelProps) {
  return (
    <span className={`text-label ${colorMap[color]}`}>{children}</span>
  );
}
