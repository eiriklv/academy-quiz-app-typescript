export interface AppComponentProps {}

export interface Question {
  text: string;
  alternatives: string[];
  correctAnswer: number;
  selectedAnswer: number | undefined;
}

export interface AppComponentState {
  questions: Question[]
  currentQuestionIndex: number | undefined;
  quizIsActive: boolean;
}