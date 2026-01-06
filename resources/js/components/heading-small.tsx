const HeadingSmall = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <header>
    <h3 className="mb-0.5 text-base font-medium">{title}</h3>
    {description && (
      <p className="text-sm text-muted-foreground">{description}</p>
    )}
  </header>
);
export default HeadingSmall;
