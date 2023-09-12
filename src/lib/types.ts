export interface Data {
  data: Sezione[];
}

export interface Sezione {
  title: string;
  domande: Domande[];
}

export interface Domande {
  domanda: string;
  valore: boolean;
}

export interface Risposta {
  domanda: string;
  valore: string;
  risposta: string;
}
