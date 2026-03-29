import Link from "next/link";
import { getQuestions } from "@/lib/questions";

const SUBJECT_LABELS: Record<string, string> = {
    riron: "理論",
    denryoku: "電力",
    kikai: "機械",
    hoki: "法規",
};

type Props = {
    params: { subject: string };
};

export default async function SubjectPage({ params }: Props) {
    const { subject } = await params;
    const questions = getQuestions(subject);
    const label = SUBJECT_LABELS[subject] ?? subject;

    return (
        <main className="p-5 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{label} 過去問一覧</h1>

            {questions.length === 0 ? (
                <p className="text-gray-500">問題データがまだありません。</p>
            ) : (
                <div className="space-y-3">
                    {questions.map((q) => (
                        <Link
                            key={q.id}
                            href={`/subjects/${subject}/${q.id}`}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                        >
                            <div>
                                <span className="font-semibold">{q.year}年 第{q.round}回 問{q.number}</span>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{q.question}</p>
                            </div>
                            <span className="text-gray-400">›</span>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}