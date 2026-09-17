"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useResources } from "@/context/resource-context";
import { AddResourceModal } from "@/components/resources/add-resource-modal";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ResourcesPage() {
  const { resources, unlinkedTasks, addResource, assignTaskResource } = useResources();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
        <PageHeader title="Resource Library" description="Everything you use to prepare for your exam, organized in one place.">
          <Button variant="red" onClick={() => setIsAddOpen(true)}><Plus className="h-4 w-4" /> Add Resource</Button>
        </PageHeader>

        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary" />
              <Input placeholder="Search resources..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res: any) => (
            <Card key={res.id}>
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-navy-700">{res.name}</h3>
                <Badge variant="default" className="mt-1">{res.type}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {unlinkedTasks.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-navy-700 mb-2">Unlinked Tasks</h3>
              {unlinkedTasks.map((task: any) => (
                <div key={task.id} className="p-2 border border-surface-border rounded-md mb-2">
                  <p className="text-sm">{task.title}</p>
                  <select onChange={(e) => assignTaskResource(task.id, e.target.value)} className="mt-1 w-full h-8 text-xs rounded-md border border-surface-border bg-white px-2">
                    <option value="">Assign Resource...</option>
                    {resources.map((r: any) => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <AddResourceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={addResource} />
    </AppShell>
  );
}