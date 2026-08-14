export default function Footer() {
  return (
    <footer className="bg-black dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-12">
      <div className="px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              TemplateHub
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Build faster with professional templates and reusable components.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Components
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            © 2025 TemplateHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
