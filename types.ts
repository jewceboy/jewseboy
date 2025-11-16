
export interface Slide {
  title: string;
  content: string[];
  speakerNote: string;
}

export interface SlideDeck {
  title: string;
  slides: Slide[];
}
