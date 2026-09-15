"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SystemReadiness } from "@/lib/readiness-engine";

export function SystemReadinessMatrix({ systems }: { systems: SystemReadiness[] }) {
  return (
    <div className="rounded-lg border border-surface-border overflow-hidden">
      <Table>
        <TableHeader className="bg-surface-muted">
          <TableRow>
            <TableHead>System</TableHead>
            <TableHead className="text-center">Coverage</TableHead>
            <TableHead className="text-center">Accuracy</TableHead>
            <TableHead className="text-center hidden sm:table-cell">Questions</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {systems.map((sys) => (
            <TableRow key={sys.id}>
              <TableCell className="font-medium text-navy-700">{sys.name}</TableCell>
              <TableCell className="text-center text-ink-secondary">{sys.coverage}%</TableCell>
              <TableCell className="text-center font-semibold text-navy-700">{sys.accuracy}%</TableCell>
              <TableCell className="text-center text-ink-secondary hidden sm:table-cell">{sys.questions}</TableCell>
              <TableCell className="text-center">
                <Badge variant={sys.readiness === 'Strong' ? 'green' : sys.readiness === 'Needs Attention' ? 'gold' : 'red'}>
                  {sys.readiness}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}