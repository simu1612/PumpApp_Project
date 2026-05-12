# PumpApp - Sito Web Ufficiale

## 📋 Descrizione Progetto

PumpApp è una piattaforma web completa per la gestione di palestre e il tracciamento dei progressi di allenamento. Questo sito web è stato costruito integrando i mockup UX/UI dalla cartella `Progetto/frontend definitivo`.

## 🌟 Caratteristiche Principali

- ✅ **5 Pagine HTML Responsive**
- ✅ **Design Moderno e Professionale**
- ✅ **Integrazione Completa di Immagini**
- ✅ **Sistema di Tab Interattivo**
- ✅ **Form Validati con HTML5**
- ✅ **Progress Bar Animate**
- ✅ **Fully Responsive (Mobile, Tablet, Desktop)**

## 📄 File del Progetto

```
PumpApp/
├── index.html           # Homepage con hero section
├── login.html           # Pagina di login
├── register.html        # Pagina di registrazione
├── scheda.html          # Schede esercizi e dettagli
├── profile.html         # Profilo utente con 3 tab
├── styles.css           # Stylesheet completo
└── README.md            # Questo file
```

## 🎨 Design e Layout

### Colori Brand
- **Primario**: `#ff5733` (Rosso vibrante)
- **Secondario**: `#c41c04` (Rosso scuro)
- **Background**: `#f5f5f5` (Grigio chiaro)
- **Text**: `#333` (Grigio scuro)

### Componenti Implementati
- Header sticky con navigazione
- Hero section con CTA buttons
- Feature cards in grid layout
- Auth pages con immagini
- Tab system nel profilo
- Progress bars animate
- Form groups con validazione

## 📸 Immagini Integrate

Le seguenti immagini dalla cartella `Progetto/frontend definitivo` sono integrate nel sito:

| Immagine | Utilizzo |
|----------|----------|
| `homepage sito.jpg` | Hero section - Homepage |
| `Login.png` | Pagina di login |
| `Register.png` | Pagina di registrazione |
| `scheda.png` | Schede di allenamento |
| `esercizio.png` | Dettagli esercizio |
| `Profile2.jpg` | Avatar profilo utente |
| `Profile_ChangePSW.png` | Cambio password |

## 🎯 Pagine Disponibili

### 1. **Homepage (index.html)**
- Hero section con call-to-action
- 4 Feature cards che descrivono i servizi
- Navigazione intuitiva

### 2. **Login (login.html)**
- Form di accesso con email e password
- Checkbox "Ricordami"
- Link per password dimenticata e registrazione

### 3. **Registrazione (register.html)**
- Form completo con nome, email, ruolo
- Selezione tipo di account (Atleta/Palestra/Trainer)
- Conferma password

### 4. **Schede Esercizi (scheda.html)**
- Visualizzazione schede di allenamento
- Dettagli esercizio con series, ripetizioni, peso
- Note tecniche e tempo di riposo

### 5. **Profilo Utente (profile.html)**
- Header profilo con avatar e statistiche
- **3 Tab Interattivi:**
  - 📋 **Informazioni**: Modifica dati personali
  - 🔒 **Sicurezza**: Cambio password
  - 🎯 **Obiettivi**: Progress tracking con animazioni

## 📱 Responsive Design

Il sito è completamente responsive con 3 breakpoint principali:

### Desktop (1200px+)
- Layout completo a 2-3 colonne
- Immagini large
- Spazi generosi

### Tablet (769px - 1199px)
- Layout adattato
- Grid columns ridotte
- Padding ridotto

### Mobile (max 768px)
- Layout single column
- Immagini responsive
- Menu mobile friendly
- Touch-friendly buttons

## 🚀 Come Iniziare

### Opzione 1: Local Server
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx http-server

# Apri browser su: http://localhost:8000
```

### Opzione 2: GitHub Pages
1. Vai a `Settings > Pages`
2. Seleziona `main` branch
3. Il sito sarà disponibile a `https://creatordanieleinzerillo.github.io/PumpApp`

### Opzione 3: Apri Direttamente
- Scarica i file
- Doppio click su `index.html`

## 💻 Tecnologie Utilizzate

- **HTML5**: Struttura semantica
- **CSS3**: Styling responsivo con Grid e Flexbox
- **JavaScript (Vanilla)**: Tab system e interattività
- **Font**: Segoe UI, Tahoma, Geneva, Verdana

## ⚙️ Funzionalità JavaScript

```javascript
// Tab Navigation System
function openTab(evt, tabName) {
    // Nascondi tutti i tab
    // Mostra il tab selezionato
    // Aggiorna stato dei button
}
```

## 🎯 Prossimi Passi

### Fase 2: Backend
- [ ] Node.js/Express server
- [ ] MongoDB database
- [ ] API REST endpoints
- [ ] JWT authentication

### Fase 3: Frontend Avanzato
- [ ] Framework React/Vue
- [ ] State management
- [ ] API integration
- [ ] Error handling

### Fase 4: Deployment
- [ ] GitHub Actions CI/CD
- [ ] Deploy su Vercel/Netlify
- [ ] SSL Certificate
- [ ] Domain configuration

## 📊 Statistiche Progetto

| Metrica | Valore |
|---------|--------|
| Pagine HTML | 5 |
| Linee CSS | 800+ |
| Linee JavaScript | 15 |
| Immagini Integrate | 7 |
| Breakpoint Responsive | 3 |
| Animazioni | 20+ |
| Componenti Riusabili | 10+ |

## 🔐 Best Practices Implementate

✅ Semantic HTML5
✅ CSS Grid & Flexbox
✅ Mobile-First Approach
✅ Accessibility (Alt text per immagini)
✅ Performance Optimization
✅ Clean Code Structure
✅ DRY Principle
✅ Responsive Images

## 👥 Autore

**Creato da**: Daniel Einzerillo  
**Data**: Maggio 2026  
**Repository**: [creatordanieleinzerillo/PumpApp](https://github.com/creatordanieleinzerillo/PumpApp)

## 📞 Contatti

Per domande o suggerimenti, contatta:
- Email: [contact@pumpapp.com]
- GitHub: [@creatordanieleinzerillo](https://github.com/creatordanieleinzerillo)

## 📄 Licenza

Questo progetto è open source ed è disponibile sotto licenza MIT.

---

## 🎉 Conclusione

PumpApp è ora pronto per essere utilizzato! Tutte le pagine sono state create basandosi sui mockup UX/UI originali e sono completamente responsive e funzionali.

**Buona fortuna con il tuo progetto! 💪**