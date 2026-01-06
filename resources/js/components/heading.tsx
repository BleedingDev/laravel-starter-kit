const Heading = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="mb-8 space-y-0.5">
    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    {description && (
      <p className="text-sm text-muted-foreground">{description}</p>
    )}
  </div>
);
export default Heading;
