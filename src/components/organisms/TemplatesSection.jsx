import Card from "../atoms/Card";
import Badge from "../atoms/Badge";

const templates = [
  {
    id: 1,
    title: "Ecommerce Store",
    category: "E-commerce",
    description: "Complete online shopping solution",
    preview: "🛍️",
    page: "ecommerce",
  },
  {
    id: 2,
    title: "Project Manager",
    category: "Business",
    description: "Manage stock and supplies",
    preview: "📦",
    page: "inventory",
  },
];

export default function TemplatesSection({ onNavigate }) {
  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Popular Templates</h2>
        <p className="text-gray-600 text-lg mt-2">
          Choose from our curated collection of templates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="group cursor-pointer overflow-hidden hover:border-primary-400 hover:bg-gradient-to-br hover:from-primary-50 hover:to-accent-50"
            onClick={() =>
              template.page && onNavigate && onNavigate(template.page)
            }
            style={{ cursor: template.page ? "pointer" : "default" }}
          >
            <div className="w-full h-48 bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 rounded-xl flex items-center justify-center text-7xl font-bold text-primary-300 mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
              {template.preview}
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {template.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Badge text={template.category} variant="primary" />
              {template.page && (
                <span className="text-xs font-bold text-primary-600 group-hover:text-accent-600 flex items-center gap-1 transition-colors">
                  Preview{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
