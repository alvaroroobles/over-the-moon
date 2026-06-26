// 1. Inicializa el traductor en segundo plano
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,fr,es', // Los idiomas que vas a permitir
        autoDisplay: false
    }, 'google_translate_element');
}

// 2. Función mágica que activa el cambio desde tus botones Tailwind
function cambiarIdiomaGoogle(codigoLang, emoji, nombreLang) {
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
        selectElement.value = codigoLang;
        
        // Lanzamos ambos eventos por si acaso el navegador bloquea uno
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Actualizamos tus textos del Header
        const activeFlag = document.getElementById('active-flag');
        const activeLang = document.getElementById('active-lang');
        if(activeFlag) activeFlag.textContent = emoji;
        if(activeLang) activeLang.textContent = nombreLang;

        // Actualizamos textos en el menú móvil si existen
        const mobileActiveFlag = document.getElementById('mobile-active-flag');
        const mobileActiveLang = document.getElementById('mobile-active-lang');
        if(mobileActiveFlag) mobileActiveFlag.textContent = emoji;
        if(mobileActiveLang) mobileActiveLang.textContent = nombreLang;
        
        // Guardamos la elección para que no se pierda al cambiar de página (.html)
        localStorage.setItem('idioma-academia', JSON.stringify({codigoLang, emoji, nombreLang}));
    } else {
        console.error("El traductor de Google aún no ha cargado completamente.");
    }
}

// 3. Persistencia: Recuperar el idioma si el usuario refresca o navega por la web
document.addEventListener("DOMContentLoaded", () => {
    const checkGoogleLoad = setInterval(() => {
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
            clearInterval(checkGoogleLoad);
            const idiomaGuardado = localStorage.getItem('idioma-academia');
            if (idiomaGuardado) {
                const { codigoLang, emoji, nombreLang } = JSON.parse(idiomaGuardado);
                // Solo aplicamos si es distinto de español para evitar bucles de carga
                if (codigoLang !== 'es') {
                    cambiarIdiomaGoogle(codigoLang, emoji, nombreLang);
                }
            }
        }
    }, 300); // Revisa cada 300ms si Google ya está listo
});