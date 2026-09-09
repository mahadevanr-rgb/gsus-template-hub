import KanbanCard from "@/pages/Cards/components/KanbanCard/KanbanCard";

const sourceCode = `import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DEFAULT_COLUMNS = [
  {
    id: "todo",
    title: "TO DO",
    items: [
      {
        id: "task-1",
        title: "Create onboarding wireframes",
        tag: "Design",
        tagColor: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
        indicatorColor: "bg-purple-400",
      },
      {
        id: "task-2",
        title: "Setup CI/CD deployment pipeline",
        tag: "DevOps",
        tagColor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
        indicatorColor: "bg-indigo-400",
      },
    ],
  },
  {
    id: "in-progress",
    title: "IN PROGRESS",
    items: [
      {
        id: "task-3",
        title: "API rate limiting",
        tag: "Bug",
        tagColor: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
        indicatorColor: "bg-sky-400",
      },
      {
        id: "task-4",
        title: "Update pricing copy",
        tag: "Content",
        tagColor: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
        indicatorColor: "bg-emerald-400",
      },
      {
        id: "task-5",
        title: "QA regression pass",
        tag: "Urgent",
        tagColor: "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400",
        indicatorColor: "bg-rose-400",
      },
    ],
  },
  {
    id: "done",
    title: "DONE",
    items: [
      {
        id: "task-6",
        title: "Design system v2 token sync",
        tag: "Release",
        tagColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
        indicatorColor: "bg-emerald-500",
      },
    ],
  },
];

function KanbanItemView({ item, isOverlay = false, onMoveLeft, onMoveRight }) {
  return (
    <div
      className={\`group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 transition-all \${
        isOverlay
          ? "shadow-2xl ring-2 ring-indigo-500/40 rotate-1 scale-105 cursor-grabbing"
          : "hover:border-indigo-400 dark:hover:border-indigo-600 shadow-sm cursor-grab active:cursor-grabbing"
      }\`}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
          {item.title}
        </h4>
        <span
          className={\`w-3.5 h-3.5 rounded-full shrink-0 mt-0.5 \${
            item.indicatorColor || "bg-indigo-400"
          }\`}
        />
      </div>

      <div className="flex items-center justify-between mt-3 pt-2">
        <span
          className={\`text-[10px] font-bold px-2 py-0.5 rounded-md \${
            item.tagColor || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          }\`}
        >
          {item.tag}
        </span>

        {!isOverlay && (
          <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center gap-1">
            {onMoveLeft && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveLeft();
                }}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                title="Move left"
              >
                â—€
              </button>
            )}
            {onMoveRight && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveRight();
                }}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                title="Move right"
              >
                â–¶
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SortableKanbanItem({ item, onMoveLeft, onMoveRight }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanItemView
        item={item}
        onMoveLeft={onMoveLeft}
        onMoveRight={onMoveRight}
      />
    </div>
  );
}

function KanbanColumn({ column, columnIndex, totalColumns, onMoveItem }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 min-w-[240px] sm:min-w-[260px] max-w-xs bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-4 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {column.title}
          </h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {column.items.length}
          </span>
        </div>

        <SortableContext
          items={column.items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 min-h-[140px]">
            {column.items.map((item) => (
              <SortableKanbanItem
                key={item.id}
                item={item}
                onMoveLeft={
                  columnIndex > 0
                    ? () => onMoveItem(item.id, column.id, columnIndex - 1)
                    : null
                }
                onMoveRight={
                  columnIndex < totalColumns - 1
                    ? () => onMoveItem(item.id, column.id, columnIndex + 1)
                    : null
                }
              />
            ))}
            {column.items.length === 0 && (
              <div className="h-24 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs text-slate-400 font-medium">
                Drop items here
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

export default function KanbanCard({
  initialColumns = DEFAULT_COLUMNS,
  columns: controlledColumns,
  onColumnsChange,
  className = "",
}) {
  const [internalColumns, setInternalColumns] = useState(initialColumns);
  const [activeId, setActiveId] = useState(null);

  const columns = controlledColumns || internalColumns;

  const updateColumns = (newCols) => {
    if (onColumnsChange) onColumnsChange(newCols);
    if (!controlledColumns) setInternalColumns(newCols);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const findColumnOfItem = (itemId) => {
    return columns.find((col) => col.items.some((item) => item.id === itemId));
  };

  const findItem = (itemId) => {
    for (const col of columns) {
      const item = col.items.find((i) => i.id === itemId);
      if (item) return item;
    }
    return null;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeItemId = active.id;
    const overId = over.id;

    const sourceColumn = findColumnOfItem(activeItemId);
    let targetColumn = columns.find((c) => c.id === overId);
    if (!targetColumn) targetColumn = findColumnOfItem(overId);

    if (!sourceColumn || !targetColumn || sourceColumn.id === targetColumn.id) return;

    const activeItem = findItem(activeItemId);
    if (!activeItem) return;

    const newColumns = columns.map((col) => {
      if (col.id === sourceColumn.id) {
        return { ...col, items: col.items.filter((i) => i.id !== activeItemId) };
      }
      if (col.id === targetColumn.id) {
        const overItemIndex = col.items.findIndex((i) => i.id === overId);
        const newItems = [...col.items];
        if (overItemIndex >= 0) {
          newItems.splice(overItemIndex, 0, activeItem);
        } else {
          newItems.push(activeItem);
        }
        return { ...col, items: newItems };
      }
      return col;
    });

    updateColumns(newColumns);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeItemId = active.id;
    const overId = over.id;

    const sourceColumn = findColumnOfItem(activeItemId);
    let targetColumn = columns.find((c) => c.id === overId);
    if (!targetColumn) targetColumn = findColumnOfItem(overId);

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn.id === targetColumn.id) {
      const oldIndex = sourceColumn.items.findIndex((i) => i.id === activeItemId);
      const newIndex = sourceColumn.items.findIndex((i) => i.id === overId);

      if (oldIndex !== newIndex && oldIndex >= 0 && newIndex >= 0) {
        const reorderedItems = arrayMove(sourceColumn.items, oldIndex, newIndex);
        const newCols = columns.map((col) =>
          col.id === sourceColumn.id ? { ...col, items: reorderedItems } : col
        );
        updateColumns(newCols);
      }
    }
  };

  const handleMoveItemToColIndex = (itemId, fromColId, targetColIndex) => {
    const targetCol = columns[targetColIndex];
    if (!targetCol) return;

    const activeItem = findItem(itemId);
    if (!activeItem) return;

    const newCols = columns.map((col) => {
      if (col.id === fromColId) {
        return { ...col, items: col.items.filter((i) => i.id !== itemId) };
      }
      if (col.id === targetCol.id) {
        return { ...col, items: [...col.items, activeItem] };
      }
      return col;
    });

    updateColumns(newCols);
  };

  const activeItem = activeId ? findItem(activeId) : null;

  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-5 sm:p-7 w-full max-w-4xl overflow-hidden \${className}\`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 overflow-x-auto pb-2">
          {columns.map((col, idx) => (
            <KanbanColumn
              key={col.id}
              column={col}
              columnIndex={idx}
              totalColumns={columns.length}
              onMoveItem={handleMoveItemToColIndex}
            />
          ))}
        </div>

        <DragOverlay>
          {activeItem ? <KanbanItemView item={activeItem} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}`;

export default {
  id: "kanban-card",
  slug: "kanban-card",
  name: "Kanban Card",
  description: "Interactive multi-column Kanban board card with smooth drag-and-drop powered by @dnd-kit, DragOverlay, and keyboard navigation.",
  category: "cards",
  subCategory: "tasks",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [
    "@dnd-kit/core@^6.3.1",
    "@dnd-kit/sortable@^10.0.0",
    "@dnd-kit/utilities@^3.2.2",
  ],
  tags: ["kanban", "board", "dnd", "drag-and-drop", "workflow", "tasks", "sprint", "columns"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/KanbanCard.jsx", type: "component" },
  ],
  uses: [
    "Interactive Kanban project workflows",
    "Sprint board work-item columns",
    "Real-time task reordering and status updates",
    "CRM and pipeline stages",
  ],
  component: KanbanCard,
  previewProps: {},
  sourceCode,
};
