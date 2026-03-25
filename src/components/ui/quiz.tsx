import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  title: string;
  questions: Question[];
}

export function Quiz({ title, questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-emerald-400">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="text-5xl font-bold text-white">
            {score} / {questions.length}
          </div>
          <p className="text-slate-300 text-center">
            {score === questions.length ? 'Perfect score! You are a nuclear expert.' : 'Good effort! Review the material and try again.'}
          </p>
          <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700 text-white">
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-400">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm font-medium text-emerald-400">Score: {score}</span>
        </div>
        <CardTitle className="text-xl text-white">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex justify-between items-center
                  ${showResult ? 'cursor-default' : 'hover:bg-slate-700 cursor-pointer'}
                  ${showCorrect ? 'bg-emerald-900/50 border-emerald-500 text-emerald-100' : ''}
                  ${showWrong ? 'bg-red-900/50 border-red-500 text-red-100' : ''}
                  ${!showResult && !isSelected ? 'bg-slate-900 border-slate-700 text-slate-200' : ''}
                  ${isSelected && !showResult ? 'bg-blue-900/50 border-blue-500 text-blue-100' : ''}
                `}
              >
                <span>{option}</span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
            <h4 className="font-semibold text-slate-200 mb-2">Explanation:</h4>
            <p className="text-slate-400 text-sm">{question.explanation}</p>
            <Button 
              onClick={nextQuestion} 
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
