"use client";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useResources } from "@/context/resource-context";
import { ResourceCard } from "@/components/resources/resource-card";
import { ResourceDetailDrawer } from "@/components/resources/resource-detail-drawer";
import { AddResourceModal } from "@/components/resources/add-resource-modal";
import { Resource, resourceScenarios, resourceTypes, calculateProgress } from "@/lib/resource-data";
import { Plus, Search, Link2, Unlink, Filter, CheckCircle, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  const { resources, unlinkedTasks, addResource, deleteResource, assignTaskResource, setScenario } = useResources();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredResources = resources.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (typeFilter === 'All' || r.type === typeFilter)
  );

  const totalTasks = 10; // Mock total
  const tasksWithResources = totalTasks - unlinkedTasks.length;
  const coverage = Math.round((tasksWithResources / totalTasks) * 100);

  return (
    <AppShell>
      <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader title="Resource Library" description="Everything you use to prepare for your exam, organized in one place." />
          <div className="flex gap-2">
            <select 
              onChange={(e) => setScenario(e.target.value)}
              className="h-9 rounded-md border border-surface-border bg-surface-subtle px-3 text-sm font-medium text-navy-700"
            >
              {resourceScenarios.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <Button variant="red" onClick={() => setIsAddOpen(true)}><Plus className="h-4 w-4" /> Add Resource</Button>
          </div>
        </div>

        {/* Metrics & Coverage */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase">Total Resources</p>
            <p className="text-2xl font-bold text-navy-700 mt-1">{resources.length}</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase">In Progress</p>
            <p className="text-2xl font-bold text-brand-600 mt-1">{resources.filter(r => r.status === 'In Progress').length}</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <p className="text-xs text-ink-tertiary uppercase">Completed</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{resources.filter(r => r.status === 'Completed').length}</p>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-ink-tertiary uppercase">Plan Coverage</p>
              <Badge variant="brand">{coverage}%</Badge>
            </div>
            <p className="text-sm font-bold text-navy-700">{tasksWithResources} / {totalTasks} tasks</p>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Library */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary" />
                <Input placeholder="Search resources..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select 
                value={typeFilter} 
                onChange={e => setTypeFilter(e.target.value)}
                className="h-9 rounded-md border border-surface-border bg-white px-3 text-sm font-medium text-navy-700"
              >
                <option>All</option>
                {resourceTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {filteredResources.length === 0 ? (
              <Card><CardContent className="py-12 text-center text-sm text-ink-secondary">No resources match your search.</CardContent></Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map(res => <ResourceCard key={res.id} resource={res} onSelect={setSelectedResource} />)}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Unlinked Tasks */}
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Unlink className="h-4 w-4" /> Unlinked Tasks</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {unlinkedTasks.length === 0 ? (
                  <p className="text-sm text-ink-secondary text-center py-4">All tasks have resources assigned!</p>
                ) : (
                  unlinkedTasks.map(task => (
                    <div key={task.id} className="p-3 rounded-md border border-surface-border">
                      <p className="text-sm font-semibold text-navy-700">{task.title}</p>
                      <p className="text-xs text-ink-tertiary mb-2">{task.system}</p>
                      <select 
                        onChange={(e) => assignTaskResource(task.id, e.target.value)}
                        className="w-full h-8 text-xs rounded-md border border-surface-border bg-white px-2"
                        defaultValue=""
                      >
                        <option value="" disabled>Assign Resource...</option>
                        {resources.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Recommended for Today */}
            <Card className="bg-gradient-to-br from-navy-700 to-navy-600 text-white">
              <CardHeader><CardTitle className="text-base text-white">Recommended for Today</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-semibold">Boards & Beyond</p>
                  <p className="text-xs text-navy-100">Pathology — Cell Injury</p>
                </div>
                <div className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-semibold">UWorld</p>
                  <p className="text-xs text-navy-100">Pathology Block — 40 Questions</p>
                </div>
                <Link href="/study/today"><Button variant="red" size="sm" className="w-full mt-2">Go to Today's Study</Button></Link>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-1.5" />
                    <div className="w-px h-full bg-surface-border" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-ink-tertiary">Today</p>
                    <p className="text-sm text-navy-700">Completed: B&B — Cell Injury</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ResourceDetailDrawer resource={selectedResource} onClose={() => setSelectedResource(null)} onDelete={deleteResource} />
      <AddResourceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={addResource} />
    </AppShell>
  );
}