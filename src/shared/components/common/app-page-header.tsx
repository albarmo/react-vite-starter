type PageHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function AppPageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-medium text-primary">{title}</h1>
        {description ? (
          <p className="mt-1 text-base text-muted-foreground">{description}</p>
        ) : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}
