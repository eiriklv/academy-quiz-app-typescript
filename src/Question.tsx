import React from 'react';
import { Question } from './types';

interface QuestionComponentProps {
  question: Question
  onNext: () => void;
  onPrevious: () => void;
  onAnswer: (selectedAlternative: number) => void;
}

class QuestionComponent extends React.Component<QuestionComponentProps, {}> {
  render() {
    return (
      <div>
        <h3>{this.props.question.text}</h3>
        <button onClick={() => this.props.onNext()}>
          Next
        </button>
      </div>
    )
  }
}

export default QuestionComponent;