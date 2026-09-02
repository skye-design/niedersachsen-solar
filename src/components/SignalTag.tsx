export default function SignalTag({
  index,
  children,
}: {
  index: number | string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-primary uppercase">
      <span className="font-data flex h-5 w-5 items-center justify-center rounded-full border border-primary/40 text-[10px] not-italic">
        {index}
      </span>
      {children}
    </span>
  );
}
