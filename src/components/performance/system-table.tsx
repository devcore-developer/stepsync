"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SystemPerformance } from "@/lib/performance-engine";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface Props {
  systems: SystemPerformance[];
  onSelect: (sys: SystemPerformance) => void;
}

const statusVariant = {
  'Strong': 'green',
  'On Track': 'brand',
  'Needs Review': 'gold',
  'Weak': 'red',
  'Not Started': 'default'
} as const;

export function SystemTable({ systems, onSelect }: Props) {
  return (
    <div className="rounded-lg border border-surface-border overflow-hidden">
      <Table>
        <TableHeader className="bg-surface-muted">
          <TableRow>
            <TableHead>System</TableHead>
            <TableHead className="text-center">Questions</TableHead>
            <TableHead className="text-center">Accuracy</TableHead>
            <TableHead className="text-center hidden md:table-cell">Completion</TableHead>
            <TableHead className="text-center hidden sm:table-cell">Trend</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {systems.map((sys) => (
            <TableRow key={sys.id} onClick={() => onSelect(sys)} className="cursor-pointer hover:bg-surface-muted/50">
              <TableCell className="font-medium text-navy-700">{sys.name}</TableCell>
              <TableCell className="text-center text-ink-secondary">{sys.questionsCompleted}</TableCell>
              <TableCell className="text-center font-semibold text-navy-700">{sys.accuracy}%</TableCell>
              <TableCell className="text-center text-ink-secondary hidden md:table-cell">{sys.completion}%</TableCell>
              <TableCell className="text-center hidden sm:table-cell">
                {sys.trend > 0 ? <ArrowUp className="h-4 w-4 text-emerald-500 mx-auto" /> : sys.trend < 0 ? <ArrowDown className="h-4 w-4 text-accent-red mx-auto" /> : <Minus className="h-4 w-4 text-ink-tertiary mx-auto" />}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={statusVariant[sys.status]}>{sys.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}