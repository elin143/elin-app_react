const PageHeader = ({
  title = "Dashboard",
  breadcrumb = "Home / Home Detail / Home Very Detail",
  children,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>

          {/* Breadcrumb */}
          <p className="text-sm text-gray-400">
            {Array.isArray(breadcrumb)
              ? breadcrumb.join(" / ")
              : breadcrumb}
          </p>
        </div>

        {/* Action */}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;