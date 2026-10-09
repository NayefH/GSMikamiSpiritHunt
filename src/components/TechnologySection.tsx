import { useState } from 'react'

const TECHNOLOGIES = [
  {
    "name": {
      "de": "JavaScript & TypeScript",
      "en": "JavaScript & TypeScript"
    },
    "packages": {
      "de": "typescript · @types/react · @types/react-dom · @types/node · @types/babel__core",
      "en": "typescript · @types/react · @types/react-dom · @types/node · @types/babel__core"
    },
    "description": {
      "de": "Die Spiellogik ist in TypeScript geschrieben und wird für den Browser in JavaScript übersetzt. Typen beschreiben Charaktere, Gegner, Fähigkeiten und Spielzustände und helfen, Fehler vor dem Start zu erkennen.",
      "en": "The game logic is written in TypeScript and compiled to JavaScript for the browser. Types describe characters, enemies, skills and game states, helping catch mistakes before the game runs."
    },
    "links": [
      {
        "label": "TypeScript",
        "href": "https://www.typescriptlang.org/docs/"
      },
      {
        "label": "JavaScript",
        "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      }
    ]
  },
  {
    "name": {
      "de": "React & React DOM",
      "en": "React & React DOM"
    },
    "packages": {
      "de": "react · react-dom",
      "en": "react · react-dom"
    },
    "description": {
      "de": "React baut die Screens aus wiederverwendbaren Komponenten auf. Hooks verwalten Lebenspunkte, Spirit, Runden und die aktuelle Ansicht. React DOM zeigt die Komponenten im Browser an und aktualisiert sie nach jeder Aktion.",
      "en": "React builds each screen from reusable components. Hooks manage health, Spirit, turns and the current view. React DOM displays the components in the browser and updates them after each action."
    },
    "links": [
      {
        "label": "React",
        "href": "https://react.dev/"
      },
      {
        "label": "React DOM",
        "href": "https://react.dev/reference/react-dom"
      }
    ]
  },
  {
    "name": {
      "de": "Anime.js",
      "en": "Anime.js"
    },
    "packages": {
      "de": "animejs",
      "en": "animejs"
    },
    "description": {
      "de": "Animiert das Einblenden der Oberfläche, schwebende Gegner, Geisterlichter und Trefferreaktionen. Bei reduzierter Bewegung in den Systemeinstellungen werden die Animationen deaktiviert.",
      "en": "Animates interface entrances, floating enemies, spirit lights and hit reactions. Animations are disabled when reduced motion is enabled in the system settings."
    },
    "links": [
      {
        "label": "Anime.js",
        "href": "https://animejs.com/documentation/"
      }
    ]
  },
  {
    "name": {
      "de": "Vite",
      "en": "Vite"
    },
    "packages": {
      "de": "vite · @vitejs/plugin-react",
      "en": "vite · @vitejs/plugin-react"
    },
    "description": {
      "de": "Stellt den Entwicklungsserver und schnelle Vorschauen bereit. Für die fertige Website bündelt Vite den Code und bindet Bilder, Musik und Soundeffekte ein. Das React-Plugin unterstützt die Entwicklung mit React.",
      "en": "Provides the development server and fast previews. For the finished website, Vite bundles code and includes images, music and sound effects. Its React plugin supports React development."
    },
    "links": [
      {
        "label": "Vite",
        "href": "https://vite.dev/guide/"
      }
    ]
  },
  {
    "name": {
      "de": "Babel & React Compiler",
      "en": "Babel & React Compiler"
    },
    "packages": {
      "de": "@babel/core · @rolldown/plugin-babel · babel-plugin-react-compiler",
      "en": "@babel/core · @rolldown/plugin-babel · babel-plugin-react-compiler"
    },
    "description": {
      "de": "Die Vite-Konfiguration führt den React Compiler über Babel aus. Er optimiert React-Komponenten automatisch, um unnötige Neuberechnungen beim Rendern zu reduzieren.",
      "en": "The Vite configuration runs the React Compiler through Babel. It automatically optimizes React components to reduce unnecessary recalculations during rendering."
    },
    "links": [
      {
        "label": "Babel",
        "href": "https://babeljs.io/docs/"
      },
      {
        "label": "React Compiler",
        "href": "https://react.dev/learn/react-compiler"
      }
    ]
  },
  {
    "name": {
      "de": "ESLint",
      "en": "ESLint"
    },
    "packages": {
      "de": "eslint · @eslint/js · typescript-eslint · eslint-plugin-react-hooks · eslint-plugin-react-refresh · globals",
      "en": "eslint · @eslint/js · typescript-eslint · eslint-plugin-react-hooks · eslint-plugin-react-refresh · globals"
    },
    "description": {
      "de": "Prüft den Quellcode auf Fehler und problematische Muster. Die Plugins kontrollieren TypeScript, die Regeln für React Hooks und die Kompatibilität mit Fast Refresh. globals beschreibt die verfügbaren globalen Namen im Browser und in Node.js.",
      "en": "Checks the source code for errors and problematic patterns. Plugins check TypeScript, React Hooks rules and Fast Refresh compatibility. globals defines the global names available in browsers and Node.js."
    },
    "links": [
      {
        "label": "ESLint",
        "href": "https://eslint.org/docs/latest/"
      },
      {
        "label": "TypeScript ESLint",
        "href": "https://typescript-eslint.io/"
      }
    ]
  },
  {
    "name": {
      "de": "npm",
      "en": "npm"
    },
    "packages": {
      "de": "Paketverwaltung & Projektbefehle",
      "en": "Package management & project commands"
    },
    "description": {
      "de": "Installiert die Bibliotheken und verwaltet ihre Abhängigkeiten. npm run dev startet die Entwicklung, npm run build erstellt die Website, npm run lint prüft den Code und npm run preview zeigt den fertigen Build lokal.",
      "en": "Installs libraries and manages dependencies. npm run dev starts development, npm run build creates the website, npm run lint checks the code, and npm run preview serves the finished build locally."
    },
    "links": [
      {
        "label": "npm",
        "href": "https://docs.npmjs.com/"
      }
    ]
  },
  {
    "name": {
      "de": "Browser-APIs für Audio & Einstellungen",
      "en": "Browser APIs for audio & settings"
    },
    "packages": {
      "de": "HTMLAudioElement · localStorage · DOM Events",
      "en": "HTMLAudioElement · localStorage · DOM Events"
    },
    "description": {
      "de": "Die eingebauten Browser-Funktionen spielen Hintergrundmusik und einzelne Soundeffekte ab. localStorage merkt sich die Lautstärke. DOM Events verbinden Menüklicks und Tastaturbedienung mit den Sounds. Dafür wird kein zusätzliches Audio-Paket benötigt.",
      "en": "Built-in browser APIs play background music and individual sound effects. localStorage remembers volume settings. DOM events connect menu clicks and keyboard activation to sounds, without an additional audio package."
    },
    "links": [
      {
        "label": "Audio",
        "href": "https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement"
      },
      {
        "label": "localStorage",
        "href": "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
      },
      {
        "label": "DOM Events",
        "href": "https://developer.mozilla.org/en-US/docs/Web/API/Event"
      }
    ]
  }
]

const COPY = {
  de: { eyebrow: 'HINTER DEN KULISSEN', heading: 'Technik hinter dem Spiel', intro: 'Diese JavaScript-Technologien und npm-Pakete bringen die Geisterjagd in deinen Browser.', summary: 'JavaScript & npm: Technologien und ihre Aufgaben', language: 'Sprache für den Technikabschnitt', links: 'Offizielle Dokumentation', newTab: 'öffnet in einem neuen Tab' },
  en: { eyebrow: 'BEHIND THE GAME', heading: 'Technology behind the game', intro: 'These JavaScript technologies and npm packages bring the ghost hunt to your browser.', summary: 'JavaScript & npm: technologies and their roles', language: 'Language for the technology section', links: 'Official documentation', newTab: 'opens in a new tab' },
}
type Language = keyof typeof COPY

function savedLanguage(): Language {
  try { return localStorage.getItem('gsmikami-technology-language') === 'en' ? 'en' : 'de' } catch { return 'de' }
}

export function TechnologySection() {
  const [language, setLanguage] = useState<Language>(savedLanguage)
  const copy = COPY[language]
  function changeLanguage(next: Language) {
    setLanguage(next)
    try { localStorage.setItem('gsmikami-technology-language', next) } catch { /* Optional preference storage. */ }
  }
  return (
    <section className="technology-section" aria-labelledby="technology-heading" lang={language}>
      <header>
        <div className="technology-heading-row">
          <div>
            <p className="technology-eyebrow">{copy.eyebrow}</p>
            <h2 id="technology-heading">{copy.heading}</h2>
          </div>
          <div className="technology-language" role="group" aria-label={copy.language}>
            <button type="button" lang="de" aria-pressed={language === 'de'} onClick={() => changeLanguage('de')}>Deutsch</button>
            <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>English</button>
          </div>
        </div>
        <p>{copy.intro}</p>
      </header>
      <details className="technology-details">
        <summary>{copy.summary}</summary>
        <div className="technology-grid">
          {TECHNOLOGIES.map((technology) => (
            <article key={technology.name.en}>
              <h3>{technology.name[language]}</h3>
              <p className="technology-packages">{technology.packages[language]}</p>
              <p>{technology.description[language]}</p>
              <nav className="technology-links" aria-label={copy.links + ': ' + technology.name[language]}>
                {technology.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label + ' (' + copy.newTab + ')'}>{link.label} <span aria-hidden="true">↗</span></a>
                ))}
              </nav>
            </article>
          ))}
        </div>
      </details>
    </section>
  )
}
