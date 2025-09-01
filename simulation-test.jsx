import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const questions = [
  {
    id: 1,
    question: "Which module of F5 BIG-IP is primarily used for load balancing traffic across servers?",
    options: [
      "A. Access Policy Manager (APM)",
      "B. Local Traffic Manager (LTM)",
      "C. Advanced Firewall Manager (AFM)",
      "D. Application Security Manager (ASM)"
    ],
    answer: "B. Local Traffic Manager (LTM)"
  },
  {
    id: 2,
    question: "What command would you use to verify the BIG-IP system license from the CLI?",
    options: [
      "A. tmsh show sys license",
      "B. tmsh list sys config",
      "C. show sys version",
      "D. cat /config/bigip.license"
    ],
    answer: "A. tmsh show sys license"
  },
  {
    id: 3,
    question: "Which BIG-IP module is responsible for securing web applications against common attacks like SQL injection?",
    options: [
      "A. Access Policy Manager (APM)",
      "B. Application Security Manager (ASM)",
      "C. Local Traffic Manager (LTM)",
      "D. Advanced Firewall Manager (AFM)"
    ],
    answer: "B. Application Security Manager (ASM)"
  },
  {
    id: 4,
    question: "Which feature of F5 BIG-IP is used to terminate SSL traffic before forwarding it to backend servers?",
    options: [
      "A. SSL Offloading",
      "B. SSL Bridging",
      "C. SSL Passthrough",
      "D. SSL Tunneling"
    ],
    answer: "A. SSL Offloading"
  }
];

export default function ExamSimulator() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per exam

  useEffect(() => {
    if (showResult) return;
    if (timeLeft === 0) {
      setShowResult(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showResult]);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  const restartExam = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(60);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardContent className="p-6">
          {!showResult ? (
            <motion.div
              key={questions[currentQuestion].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">
                {questions[currentQuestion].question}
              </h2>
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleAnswer(opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <p className="text-sm font-medium text-red-600 mt-2">
                Time Left: {timeLeft}s
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Exam Completed</h2>
              <p className="text-lg mb-2">Your Score: {score} / {questions.length}</p>
              <p className="text-gray-600 mb-4">
                {score === questions.length ? "Excellent work!" : "Keep practicing!"}
              </p>
              <Button onClick={restartExam} className="mt-4">Restart Exam</Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}