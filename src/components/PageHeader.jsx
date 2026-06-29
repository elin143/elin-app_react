import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

// THEME TOKENS
const INK = "#2E2228";
const SAGE = "#A9748C";

const PageHeader = ({
  title = "Dashboard",
  breadcrumb = "Home / Home Detail / Home Very Detail",
  children,
}) => {
  // Normalize breadcrumb to array of { label, to? } objects
  const normalizeBreadcrumb = () => {
    if (Array.isArray(breadcrumb)) {
      return breadcrumb.map((item) =>
        typeof item === "string" ? { label: item } : item
      );
    }
    if (typeof breadcrumb === "string") {
      return breadcrumb.split(" / ").map((label) => ({ label }));
    }
    if (breadcrumb && breadcrumb.label) {
      return [breadcrumb];
    }
    return [];
  };

  const crumbs = normalizeBreadcrumb();

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          {/* Title */}
          {typeof title === "string" ? (
            <h1
              className="text-2xl font-semibold"
              style={{ fontFamily: "Fraunces, serif", color: INK }}
            >
              {title}
            </h1>
          ) : (
            title
          )}

          {/* Breadcrumb */}
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 mt-1">
              {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <span key={i} className="flex items-center gap-2">
                    {crumb.to && !isLast ? (
                      <Link
                        to={crumb.to}
                        className="text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: SAGE }}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={`text-sm ${isLast ? "font-medium" : ""}`}
                        style={{ color: isLast ? INK : SAGE }}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <FaChevronRight
                        size={9}
                        style={{ color: `${SAGE}80` }}
                      />
                    )}
                  </span>
                );
              })}
            </nav>
          )}
        </div>

        {/* Action Button */}
        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
