'use client';

import { DragEvent, ReactNode, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';

export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
    return items;
  }
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

interface SortableCardProps {
  listId: string;
  index: number;
  onMove: (from: number, to: number) => void;
  children: ReactNode;
}

// Only the handle is draggable so text selection inside the card's inputs keeps working.
// The source is kept at module level so a card can only be dropped onto its own list.
let dragSource: { listId: string; index: number } | null = null;

export default function SortableCard({ listId, index, onMove, children }: SortableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const isSameList = () => dragSource !== null && dragSource.listId === listId;

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    dragSource = { listId, index };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${listId}:${index}`);
    if (cardRef.current) e.dataTransfer.setDragImage(cardRef.current, 16, 16);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    dragSource = null;
    setIsDragging(false);
    setIsOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!isSameList()) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!isSameList() || !dragSource) return;
    e.preventDefault();
    const from = dragSource.index;
    dragSource = null;
    setIsOver(false);
    if (from !== index) onMove(from, index);
  };

  return (
    <div
      ref={cardRef}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`border rounded p-3 relative space-y-2 transition-colors ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <button
        type="button"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        aria-label="Sürükleyerek sırala"
        title="Sürükleyerek sırala"
        className="absolute top-0.5 left-0.5 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-0.5 rounded"
      >
        <GripVertical className="w-3 h-3" />
      </button>
      {children}
    </div>
  );
}
