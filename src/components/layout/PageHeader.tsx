type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <header className="animate-rise mb-8">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      ) : null}
      <h1 className="mt-1.5 font-display text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
};

export default PageHeader;