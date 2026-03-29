"use client";

import { notFound } from "next/navigation";
import { getQuestion, getQuestions } from "@/lib/questions";
import { MathText } from "@/components/MathText";
import { AiCopyButton } from "@/components/AiCopyButton";
import { useState } from "react";
import Link from "next/link";
import { use } from "react";

type Props = {
    params: Promise<{ subject: string; id: string }>;
};

const SUBJECT_LABELS: Record<string, string> = {
    rikron: "理論",
    denryoku: "電力",
    kikai: "機械",
    hoki: "法規",
};

export default function QuestionPage({ params }: Props) {
    const { subject, id } = use(params);
    const question = getQuestion(subject, id);

    if (!question) notFound();

    const [showAnswer, setShowAnswer] = useState(false);
    const label = SUBJECT_LABELS[subject] ?? subject;

    return (
        <main className="p-5 max-w-2xl mx-auto">

            {/* パンくず */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:underline">トップ</Link>
                <span className="mx-2">›</span>
                <Link href={`/subjects/${subject}`} className="hover:underline">{label}</Link>
                <span className="mx-2">›</span>
                <span>{question.year}年 第{question.round}回 問{question.number}</span>
            </nav>

            {/* タイトル */}
            <h1 className="text-xl font-bold mb-6">
                {label}｜{question.year}年 第{question.round}回 問{question.number}
            </h1>

            {/* 問題文 */}
            <section className="mb-6 p-4 bg-gray-50 rounded-lg leading-relaxed">
                <MathText text={question.question} />
            </section>

            {/* 図 */}
            {question.hasImage && question.images && (
                <div className="flex flex-wrap gap-4 mb-6">
                    {question.images.map((img) => (
                        <img
                            key={img}
                            src={`/images/questions/${img}`}
                            alt={img}
                            className="max-w-full rounded border"
                        />
                    ))}
                </div>
            )}

            {/* 選択肢 */}
            <section className="mb-6 space-y-3">
                {(["1", "2", "3", "4", "5"] as const).map((key) => {
                    const isAnswer = showAnswer && question.answer === key;
                    return (
                        <div
                            key={key}
                            className={`flex gap-3 p-3 rounded-lg border transition
                ${isAnswer
                                    ? "border-green-400 bg-green-50"
                                    : "border-gray-200 bg-white"
                                }`}
                        >
                            <span className={`font-bold shrink-0 ${isAnswer ? "text-green-600" : "text-gray-400"}`}>
                                ({key})
                            </span>
                            <MathText text={question.choices[key]} />
                        </div>
                    );
                })}
            </section>

            {/* 正解ボタン */}
            <div className="mb-8">
                {!showAnswer ? (
                    <button
                        onClick={() => setShowAnswer(true)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        正解を見る
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <span className="text-green-600 font-bold text-lg">
                            正解：({question.answer})
                        </span>
                        <button
                            onClick={() => setShowAnswer(false)}
                            className="text-sm text-gray-400 hover:underline"
                        >
                            隠す
                        </button>
                    </div>
                )}
            </div>

            {/* AIコピーボタン */}
            <AiCopyButton question={question} subject={subject} />

            {/* 前後ナビ */}
            <QuestionNav subject={subject} currentId={id} />

        </main>
    );
}

// 前後の問題ナビゲーション
function QuestionNav({ subject, currentId }: { subject: string; currentId: string }) {
    const questions = getQuestions(subject);
    const currentIndex = questions.findIndex((q) => q.id === currentId);
    const prev = questions[currentIndex - 1];
    const next = questions[currentIndex + 1];

    return (
        <nav className="flex justify-between mt-10 pt-6 border-t text-sm">
            {prev ? (
                <Link href={`/subjects/${subject}/${prev.id}`} className="text-blue-600 hover:underline">
                    ← 問{prev.number}
                </Link>
            ) : <span />}
            {next ? (
                <Link href={`/subjects/${subject}/${next.id}`} className="text-blue-600 hover:underline">
                    問{next.number} →
                </Link>
            ) : <span />}
        </nav>
    );
}