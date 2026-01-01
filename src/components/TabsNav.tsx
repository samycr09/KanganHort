import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Home", to: "/" },
  { label: "Plants", to: "/plants" },
  { label: "Seasons", to: "/seasons" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function TabsNav() {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex gap-2 overflow-x-auto py-2">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) =>
                [
                  "px-4 py-2 rounded-lg whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-gray-100",
                ].join(" ")
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
