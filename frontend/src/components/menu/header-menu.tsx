import keycloak from "@/keycloak"; 
export default function HeaderMenu() {
  return (
    <div className="absolute top-14 right-0 w-48 bg-white border border-gray-200 shadow-xl rounded-2xl py-2 z-50 mb-10 flex flex-col overflow-hidden">
      <button 
        onClick={() => keycloak.accountManagement()}
        className="px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
      >
        Voir mon compte
      </button>
      
      <button 
        onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
        className="px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
      >
        Se déconnecter
      </button>
    </div>
  );
}