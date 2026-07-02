/**
 * Cookie Consent Banner for Over the Moon Academia
 * Conforms to LSSI-CE, LOPDGDD, GDPR, and AEPD guidelines.
 */
(function() {
    const STORAGE_KEY = 'cookie-consent-settings';

    function init() {
        const consent = getConsent();
        if (!consent) {
            showBanner();
        }
    }

    function getConsent() {
        try {
            const item = localStorage.getItem(STORAGE_KEY);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(settings) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            console.error('Error saving cookie consent', e);
        }
    }

    function showBanner() {
        // Create styles
        const style = document.createElement('style');
        style.textContent = `
            #cookie-banner-container {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 99999;
                padding: 16px;
                display: flex;
                justify-content: center;
                pointer-events: none;
                font-family: 'Inter', sans-serif;
            }
            #cookie-banner-card {
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(12px);
                border: 1px solid #bec8cb;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                border-radius: 16px;
                padding: 24px;
                max-width: 480px;
                width: 100%;
                pointer-events: auto;
                transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                transform: translateY(20px);
                opacity: 0;
            }
            #cookie-banner-card.show {
                transform: translateY(0);
                opacity: 1;
            }
            #cookie-banner-title {
                font-family: 'Montserrat', sans-serif;
                font-weight: 700;
                font-size: 18px;
                color: #005864;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #cookie-banner-text {
                font-size: 14px;
                line-height: 20px;
                color: #3e484b;
                margin-bottom: 20px;
            }
            #cookie-banner-text a {
                color: #005864;
                text-decoration: underline;
                font-weight: 500;
            }
            #cookie-banner-buttons {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            @media (min-width: 400px) {
                #cookie-banner-buttons {
                    flex-direction: row;
                }
            }
            .cookie-banner-btn {
                flex: 1;
                padding: 10px 16px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
                text-align: center;
            }
            .cookie-banner-btn-primary {
                background-color: #017281;
                color: #ffffff;
            }
            .cookie-banner-btn-primary:hover {
                background-color: #005864;
            }
            .cookie-banner-btn-secondary {
                background-color: #586061;
                color: #ffffff;
            }
            .cookie-banner-btn-secondary:hover {
                opacity: 0.9;
            }
            #cookie-banner-config-panel {
                display: none;
                margin-top: 16px;
                border-top: 1px solid #bec8cb;
                padding-top: 16px;
            }
            .cookie-banner-config-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }
            .cookie-banner-config-item-title {
                font-weight: 600;
                font-size: 14px;
                color: #1a1c1e;
            }
            .cookie-banner-config-item-desc {
                font-size: 11px;
                color: #586061;
                margin-top: 2px;
            }
            /* Custom Switch Toggle CSS */
            .cookie-switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
            }
            .cookie-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .cookie-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #bec8cb;
                transition: .4s;
                border-radius: 24px;
            }
            .cookie-slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            .cookie-switch input:checked + .cookie-slider {
                background-color: #017281;
            }
            .cookie-switch input:disabled + .cookie-slider {
                opacity: 0.6;
                cursor: not-allowed;
            }
            .cookie-switch input:checked + .cookie-slider:before {
                transform: translateX(20px);
            }
        `;
        document.head.appendChild(style);

        // Create elements
        const container = document.createElement('div');
        container.id = 'cookie-banner-container';

        const card = document.createElement('div');
        card.id = 'cookie-banner-card';

        // Content HTML
        card.innerHTML = `
            <div id="cookie-banner-title">
                <span>🍪</span> Consentimiento de Cookies
            </div>
            <div id="cookie-banner-text">
                En <strong>Over the Moon Academia</strong> utilizamos cookies propias y de terceros para asegurar el correcto funcionamiento del sitio, recordar sus preferencias, analizar visitas estadísticas y mostrar contenido interactivo. Puede configurar sus preferencias o aceptarlas todas. Lea más en nuestra <a href="cookie-policy.html">Política de Cookies</a>.
            </div>
            <div id="cookie-banner-buttons">
                <button type="button" class="cookie-banner-btn cookie-banner-btn-primary" id="cookie-accept-all">Aceptar todo</button>
                <button type="button" class="cookie-banner-btn cookie-banner-btn-primary" id="cookie-reject-all">Rechazar todo</button>
                <button type="button" class="cookie-banner-btn cookie-banner-btn-secondary" id="cookie-configure">Configurar</button>
            </div>
            <div id="cookie-banner-config-panel">
                <div class="cookie-banner-config-item">
                    <div>
                        <div class="cookie-banner-config-item-title">Técnicas / Necesarias</div>
                        <div class="cookie-banner-config-item-desc">Imprescindibles para el correcto funcionamiento de la web.</div>
                    </div>
                    <label class="cookie-switch">
                        <input type="checkbox" id="cookie-cb-necessary" checked disabled>
                        <span class="cookie-slider"></span>
                    </label>
                </div>
                <div class="cookie-banner-config-item">
                    <div>
                        <div class="cookie-banner-config-item-title">Analíticas</div>
                        <div class="cookie-banner-config-item-desc">Permiten estudiar de forma anónima la navegación del usuario.</div>
                    </div>
                    <label class="cookie-switch">
                        <input type="checkbox" id="cookie-cb-analytics">
                        <span class="cookie-slider"></span>
                    </label>
                </div>
                <div class="cookie-banner-config-item">
                    <div>
                        <div class="cookie-banner-config-item-title">Publicidad / Terceros</div>
                        <div class="cookie-banner-config-item-desc">Habilitan elementos interactivos de servicios externos (mapas, vídeos, etc.).</div>
                    </div>
                    <label class="cookie-switch">
                        <input type="checkbox" id="cookie-cb-marketing">
                        <span class="cookie-slider"></span>
                    </label>
                </div>
                <div style="margin-top: 16px; text-align: right;">
                    <button type="button" class="cookie-banner-btn cookie-banner-btn-primary" id="cookie-save-config" style="width: auto; padding-left: 24px; padding-right: 24px;">Guardar selección</button>
                </div>
            </div>
        `;

        container.appendChild(card);
        document.body.appendChild(container);

        // Add class with a small delay for animation
        setTimeout(() => {
            card.classList.add('show');
        }, 100);

        // Event listeners
        document.getElementById('cookie-accept-all').addEventListener('click', () => {
            respond({ necessary: true, analytics: true, marketing: true });
        });

        document.getElementById('cookie-reject-all').addEventListener('click', () => {
            respond({ necessary: true, analytics: false, marketing: false });
        });

        document.getElementById('cookie-configure').addEventListener('click', () => {
            const panel = document.getElementById('cookie-banner-config-panel');
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
            }
        });

        document.getElementById('cookie-save-config').addEventListener('click', () => {
            const analytics = document.getElementById('cookie-cb-analytics').checked;
            const marketing = document.getElementById('cookie-cb-marketing').checked;
            respond({ necessary: true, analytics: analytics, marketing: marketing });
        });

        function respond(settings) {
            saveConsent(settings);
            card.classList.remove('show');
            setTimeout(() => {
                container.remove();
            }, 300);
        }
    }

    // Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
