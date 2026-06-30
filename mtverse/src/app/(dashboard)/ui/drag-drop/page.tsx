"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical, Check, X, ArrowRight, Inbox, Folder, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

type Task = { id: string; title: string; priority: "low" | "med" | "high"; done: boolean };

function SortableItem({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };
  const priorityColor = {
    low: "bg-muted text-muted-foreground border-border",
    med: "bg-warning/10 text-warning border-warning/20",
    high: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-background p-2.5",
        isDragging && "shadow-lg ring-2 ring-primary/40"
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none">
        <GripVertical className="size-4" />
      </button>
      <Checkbox checked={task.done} onCheckedChange={() => onToggle(task.id)} />
      <span className={cn("text-sm flex-1", task.done && "line-through text-muted-foreground")}>{task.title}</span>
      <Badge variant="outline" className={cn("text-[10px] capitalize", priorityColor[task.priority])}>{task.priority}</Badge>
    </div>
  );
}

function SortableCard({ id, title, count }: { id: string; title: string; count: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("rounded-lg border border-border bg-background p-4 cursor-grab active:cursor-grabbing select-none", isDragging && "shadow-lg ring-2 ring-primary/40")}
      {...attributes}
      {...listeners}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{count} items</p>
    </div>
  );
}

function Html5DropZone() {
  const [items, setItems] = React.useState([
    { id: "h1", label: "Q4 planning doc", tag: "doc" },
    { id: "h2", label: "Aurora mockups", tag: "design" },
    { id: "h3", label: "API spec draft", tag: "code" },
  ]);
  const [dropped, setDropped] = React.useState<string[]>([]);
  const [over, setOver] = React.useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Drag these →</p>
        {items.map((it) => (
          <div
            key={it.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
            className="flex items-center gap-2 rounded-md border border-border bg-background p-2.5 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-colors"
          >
            <GripVertical className="size-3.5 text-muted-foreground" />
            <span className="text-sm flex-1">{it.label}</span>
            <Badge variant="outline" className="text-[10px]">{it.tag}</Badge>
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Drop here</p>
        <div
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            const id = e.dataTransfer.getData("text/plain");
            const item = items.find((i) => i.id === id);
            if (item) {
              setDropped((prev) => [...prev, item.label]);
              setItems((prev) => prev.filter((i) => i.id !== id));
              toast.success(`Dropped “${item.label}”`);
            }
          }}
          className={cn(
            "rounded-lg border-2 border-dashed p-4 min-h-[200px] flex flex-col gap-2 transition-colors",
            over ? "border-primary bg-primary/5" : "border-border"
          )}
        >
          {dropped.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-xs text-muted-foreground">
              <Inbox className="size-6 mb-1.5" />
              Drop items here
            </div>
          ) : (
            dropped.map((d, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md bg-success/5 border border-success/20 p-2">
                <Check className="size-3.5 text-success" />
                <span className="text-xs flex-1">{d}</span>
                <button onClick={() => setDropped((prev) => prev.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive">
                  <X className="size-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function DragDropPage() {
  const [tasks, setTasks] = React.useState<Task[]>([
    { id: "t1", title: "Ship radar chart component", priority: "high", done: false },
    { id: "t2", title: "Review Aurora design spec", priority: "med", done: false },
    { id: "t3", title: "Update changelog for v2.4.1", priority: "low", done: true },
    { id: "t4", title: "Migrate CI to GitHub Actions", priority: "high", done: false },
    { id: "t5", title: "Write API docs for /v2", priority: "med", done: false },
  ]);
  const [columns, setColumns] = React.useState([
    { id: "c1", title: "Backlog", count: 14 },
    { id: "c2", title: "In Progress", count: 5 },
    { id: "c3", title: "In Review", count: 3 },
    { id: "c4", title: "Done", count: 28 },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setTasks((prev) => {
        const oldIdx = prev.findIndex((t) => t.id === active.id);
        const newIdx = prev.findIndex((t) => t.id === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
      toast.info("Task reordered");
    }
  };

  const handleColDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setColumns((prev) => {
        const oldIdx = prev.findIndex((c) => c.id === active.id);
        const newIdx = prev.findIndex((c) => c.id === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Drag & Drop"
        description="Sortable lists and cards powered by @dnd-kit, plus an HTML5 drag-drop demo."
        breadcrumbs={[{ label: "UI Library" }, { label: "Drag & Drop" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Sortable Task List" description="Drag rows to reorder priorities" className="lg:col-span-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2 max-w-2xl">
                {tasks.map((t) => (
                  <SortableItem key={t.id} task={t} onToggle={toggleTask} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{tasks.filter(t => t.done).length} of {tasks.length} complete</span>
            <Button variant="ghost" size="sm" onClick={() => toast.info("Reset order")}>Reset order</Button>
          </div>
        </SectionCard>

        <SectionCard title="Sortable Columns" description="Drag horizontally to reorder board columns">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleColDragEnd}>
            <SortableContext items={columns.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
              <div className="grid grid-cols-2 gap-2">
                {columns.map((c) => (
                  <SortableCard key={c.id} id={c.id} title={c.title} count={c.count} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
            <GripVertical className="size-3" /> Drag any card to reorder the board layout.
          </p>
        </SectionCard>

        <SectionCard title="HTML5 Drag-Drop" description="Native browser drag-drop without libraries">
          <Html5DropZone />
        </SectionCard>

        <SectionCard title="Move Between Lists" description="Drag items to assign to category" className="lg:col-span-2">
          <MoveBetweenLists />
        </SectionCard>
      </div>
    </div>
  );
}

function MoveBetweenLists() {
  const [backlog, setBacklog] = React.useState([
    { id: "m1", label: "Refactor auth module" },
    { id: "m2", label: "Add dark mode to charts" },
    { id: "m3", label: "Fix mobile nav overflow" },
    { id: "m4", label: "Optimize bundle size" },
  ]);
  const [sprint, setSprint] = React.useState([
    { id: "m5", label: "Release v2.4.1 hotfix" },
  ]);
  const [overBacklog, setOverBacklog] = React.useState(false);
  const [overSprint, setOverSprint] = React.useState(false);

  const moveTo = (id: string, from: "backlog" | "sprint", to: "backlog" | "sprint") => {
    if (from === to) return;
    const source = from === "backlog" ? backlog : sprint;
    const item = source.find((i) => i.id === id);
    if (!item) return;
    if (from === "backlog") {
      setBacklog((prev) => prev.filter((i) => i.id !== id));
      setSprint((prev) => [...prev, item]);
    } else {
      setSprint((prev) => prev.filter((i) => i.id !== id));
      setBacklog((prev) => [...prev, item]);
    }
    toast.success(`Moved “${item.label}” to ${to}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Folder className="size-4 text-muted-foreground" />
          <p className="text-xs font-medium">Backlog ({backlog.length})</p>
        </div>
        <div
          onDragOver={(e) => { e.preventDefault(); setOverBacklog(true); }}
          onDragLeave={() => setOverBacklog(false)}
          onDrop={(e) => { e.preventDefault(); setOverBacklog(false); moveTo(e.dataTransfer.getData("text/plain"), "sprint", "backlog"); }}
          className={cn(
            "rounded-lg border-2 border-dashed p-2 space-y-2 min-h-[180px] transition-colors",
            overBacklog ? "border-primary bg-primary/5" : "border-border"
          )}
        >
          {backlog.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">Drop here to move to backlog</p>
          ) : (
            backlog.map((it) => (
              <div
                key={it.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
                className="flex items-center gap-2 rounded-md border border-border bg-background p-2 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-colors"
              >
                <GripVertical className="size-3.5 text-muted-foreground" />
                <span className="text-sm flex-1">{it.label}</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Star className="size-4 text-primary" />
          <p className="text-xs font-medium">Current Sprint ({sprint.length})</p>
        </div>
        <div
          onDragOver={(e) => { e.preventDefault(); setOverSprint(true); }}
          onDragLeave={() => setOverSprint(false)}
          onDrop={(e) => { e.preventDefault(); setOverSprint(false); moveTo(e.dataTransfer.getData("text/plain"), "backlog", "sprint"); }}
          className={cn(
            "rounded-lg border-2 border-dashed p-2 space-y-2 min-h-[180px] transition-colors",
            overSprint ? "border-primary bg-primary/5" : "border-border"
          )}
        >
          {sprint.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">Drop here to add to sprint</p>
          ) : (
            sprint.map((it) => (
              <div
                key={it.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
                className="flex items-center gap-2 rounded-md border border-border bg-background p-2 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-colors"
              >
                <GripVertical className="size-3.5 text-muted-foreground" />
                <span className="text-sm flex-1">{it.label}</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
