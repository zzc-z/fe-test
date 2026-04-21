'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PanelId } from '@/hooks/usePanelState';
import { PanelDragContext } from './contexts/PanelDragContext';

interface SortablePanelProps {
  id: PanelId;
  children: React.ReactNode;
}

export default function SortablePanel({ id, children }: SortablePanelProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const dragHandleProps = {
    ...attributes,
    ...listeners,
    onPointerDown: (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest('button')) {
        return;
      }
      listeners?.onPointerDown?.(e);
    },
  };

  return (
    <PanelDragContext.Provider value={dragHandleProps}>
      <div
        ref={setNodeRef}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        suppressHydrationWarning
        className={`h-full flex-1 min-w-0 ${isDragging ? 'opacity-50 z-50' : ''}`}
      >
        {children}
      </div>
    </PanelDragContext.Provider>
  );
}
