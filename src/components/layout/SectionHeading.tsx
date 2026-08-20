type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  className?: string;
};

const SectionHeading = ({ eyebrow, title, className = "" }: SectionHeadingProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{title}</h2>
    </div>
  );
};

export default SectionHeading;