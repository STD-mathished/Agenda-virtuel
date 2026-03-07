import { cn } from "@/lib/utils";

export default function FooterApp() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 bg-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Description */}
          <div className="flex flex-col gap-4">
            <div className="text-xl font-semibold tracking-tight">
              Agendai<span className="text-blue-600">.</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Simplifiez votre gestion du temps avec notre modèle.
              Planifiez, organisez et optimisez vos journées sans effort.
            </p>
          </div>

          {/* Section Produit */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-900">Produit</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Intégrations</a></li>
            </ul>
          </div>

          {/* Section Compagnie */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-900">Compagnie</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Section Légal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-900">Légal</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Conditions</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Sécurité</a></li>
            </ul>
          </div>
        </div>

        {/* Barre de copyright */}
        <div className={cn(
          "pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4",
          "text-xs text-gray-400"
        )}>
          <p>© {currentYear} Mathis HEDER. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/mathis-heder/"  target="_blank" className="hover:text-gray-600">LinkedIn</a>
            <a href="https://github.com/STD-mathished/" target="_blank" className="hover:text-gray-600">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}