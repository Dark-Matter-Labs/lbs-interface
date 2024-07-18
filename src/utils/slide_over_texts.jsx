const slide_texts = {
  filter: {
    text: (
      <p className="book-intro-md text-dark-wood-800">
       Hier können Sie filtern, um die Standorte/Gebiete/Spots anzuzeigen, die mit dem größten Klimarisiko (schlechteste 20 %) und dem Bedarf an Anpassungslösungen bewertet wurden.
      </p>
    ),
  },
  bottomTable: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>Zusammenfassung der Risikokomponenten für ausgewählte Netze.</p>
      </div>
    ),
  },
  bottomTableOverall: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
        In dieser Tabelle sind die Bewertungen der verschiedenen bewerteten Klimarisiko-Wirkungsketten des ausgewählten Standorts zusammengefasst.
        </p>
      </div>
    ),
  },
  topLegendHitze: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
        Das Risiko der Hitze für die Gesundheit und das Wohlbefinden der Bevölkerung wird anhand der in dieser Tabelle aufgeführten Indikatoren und Gewichtungen beurteilt.
        </p>
      </div>
    ),
  },
  topLegendTrocken: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
        Das Dürrerisiko für die Baumgesundheit wird anhand der in dieser Tabelle aufgeführten Indikatoren und Gewichtungen beurteilt.
        </p>
      </div>
    ),
  },
  topLegendLuft: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
        Das Risiko der Luftverschmutzung für die Gesundheit der Bevölkerung wird anhand der in dieser Tabelle aufgeführten Indikatoren und Gewichtungen beurteilt.
        </p>
      </div>
    ),
  },
  topLegendUber1: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
        Das Risiko einer Überschwemmung bebauter Flächen durch Oberflächenwasser wird anhand der in dieser Tabelle aufgeführten Indikatoren und Gewichtungen beurteilt.
        </p>
      </div>
    ),
  },
  topLegendUber2: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
        Das Risiko von Überschwemmungen des Verkehrsnetzes durch Oberflächenwasser wird anhand der in dieser Tabelle aufgeführten Indikatoren und Gewichtungen beurteilt.
        </p>
      </div>
    ),
  },
  topLegendOverall: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
        Hier ist die Legende für die Risikoraster, die in der Karte übereinandergelegt sind. Je
höher der Wert, desto höher das kombinierte Risiko durch die verschiedenen
Gefahren (Dürre, Hitze, Luftverschmutzung und Überschwemmung). Sehen Sie sich die Tabelle
unten an, um herauszufinden, wie sich dieses Risiko auf diese
Gefahren verteilt.
        </p>
      </div>
    ),
  },
};

export function get_slide_texts() {
  return slide_texts;
}
