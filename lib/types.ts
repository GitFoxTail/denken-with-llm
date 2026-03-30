export type Question = {
  id: string;
  year: number;
  round: number;
  number: number;
  question: string;
  choices: Record<string, string>;
  answer: number;
  hasImage: boolean;
  images: string[];
  tags: string[];
};