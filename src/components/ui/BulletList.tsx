export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-fg-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
