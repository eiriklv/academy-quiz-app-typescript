import React from 'react';
import { AppComponentProps, AppComponentState } from './types';
import Question from './Question';

class App extends React.Component<AppComponentProps, AppComponentState> {
  constructor(props: AppComponentProps) {
    super(props);

    this.state = {
      questions: [
        {
          text: "Who is the president of the U.S.A?",
          alternatives: ["Donald Trump", "Joe Biden", "Joe Rogan", "Seth Rogen"],
          correctAnswer: 0,
          selectedAnswer: undefined
        },
        {
          text: "What is the capital of Norway?",
          alternatives: ["Trondheim", "Oslo", "Bergen", "Stavanger"],
          correctAnswer: 1,
          selectedAnswer: undefined
        },
      ],
      quizIsActive: false,
      currentQuestionIndex: undefined
    }
  }

  handleStartQuiz() {
    this.setState({
      currentQuestionIndex: 0,
      quizIsActive: true
    });
  }

  handleNext() {
    const currentQuestionIndex = this.state.currentQuestionIndex;
    const questions = this.state.questions;

    if (typeof currentQuestionIndex === 'number') {
      if (currentQuestionIndex === questions.length - 1) {
        this.setState({
          currentQuestionIndex: undefined,
        })
      } else {
        this.setState({
          currentQuestionIndex: currentQuestionIndex + 1
        })
      }
    }
  }

  handlePrevious() {
    if (typeof this.state.currentQuestionIndex === 'number') {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex - 1
      })
    }
  }

  handleAnswer(questionIndex: number, selectedAlternative: number) {
    this.setState((oldState) => {
      return {
        ...oldState,
        questions: oldState.questions.map((question, index) => {
          return index === questionIndex ? {
            ...question,
            selectedAnswer: selectedAlternative
          } : question;
        })
      }
    })
  }

  render() {
    const currentQuestionIndex = this.state.currentQuestionIndex;
    const quizIsActive = this.state.quizIsActive;

    if (typeof currentQuestionIndex === 'undefined') {
      if (quizIsActive) {
        return (
          <div>This is your score: ...</div>
        )
      } else {
        return (
          <div>
            <h1>Welcome!</h1>
            <button onClick={() => this.handleStartQuiz()}>
              Start quiz
            </button>
          </div>
        );
      }
    }

    const activeQuestion = this.state.questions[currentQuestionIndex];

    return (
      <Question
        question={activeQuestion}
        onNext={() => this.handleNext()}
        onPrevious={() => this.handlePrevious()}
        onAnswer={(selectedAlternative: number) => {
          this.handleAnswer(currentQuestionIndex, selectedAlternative)
        }}
      />
    );
  }
}

export default App;
