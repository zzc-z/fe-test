"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import MapPanel from "./panels/MapPanel";
import MusicPanel from "./panels/MusicPanel";
import ChatPanel from "./panels/ChatPanel";
import SortablePanel from "./SortablePanel";
import { PanelId } from "@/hooks/usePanelState";

const panelComponents: Record<
  PanelId,
  React.ComponentType<{ onClose: () => void }>
> = {
  map: MapPanel,
  music: MusicPanel,
  chat: ChatPanel,
};

interface PanelContainerProps {
  order: PanelId[];
  openPanels: PanelId[];
  onOrderChange: (newOrder: PanelId[]) => void;
  onClosePanel: (id: PanelId) => void;
}

export default function PanelContainer({
  order,
  openPanels,
  onOrderChange,
  onClosePanel,
}: PanelContainerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = order.indexOf(active.id as PanelId);
      const newIndex = order.indexOf(over.id as PanelId);

      const newOrder = [...order];
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, active.id as PanelId);

      onOrderChange(newOrder);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
    >
      <div className="flex overflow-x-auto h-full scrollbar-hide">
        <SortableContext items={order} strategy={horizontalListSortingStrategy}>
          {order.map((id) => {
            const PanelComponent = panelComponents[id];
            if (!openPanels.includes(id)) return null;

            return (
              <SortablePanel key={id} id={id}>
                <PanelComponent onClose={() => onClosePanel(id)} />
              </SortablePanel>
            );
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
}
