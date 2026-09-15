import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AccuracyChart({ data }: { data: { week: string; accuracy: number }[] }) {
  if (data.length === 0) return null;
  
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Accuracy Trend</CardTitle></CardHeader>
      <CardContent>
        <div className="h-48 w-full flex items-end justify-between gap-2 pt-4">
          {data.map((d) => (
            <div key={d.week} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex-1 flex items-end">
                <div 
                  className="w-full bg-brand-200 rounded-t-md group-hover:bg-brand-300 transition-all" 
                  style={{ height: `${d.accuracy}%` }} 
                />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[0.6875rem] font-bold text-navy-700 opacity-0 group-hover:opacity-100 transition">
                  {d.accuracy}%
                </span>
              </div>
              <span className="text-[0.6875rem] text-ink-tertiary">{d.week}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}