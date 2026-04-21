"use client";

import {
  MapIcon,
  MusicalNoteIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { PanelId } from "@/hooks/usePanelState";

interface LeftSidebarProps {
  order: PanelId[];
  openPanels: PanelId[];
  onTogglePanel: (id: PanelId) => void;
}

const iconMap: Record<PanelId, React.ComponentType<{ className?: string }>> = {
  map: MapIcon,
  music: MusicalNoteIcon,
  chat: ChatBubbleBottomCenterIcon,
};

export default function LeftSidebar({
  order,
  openPanels,
  onTogglePanel,
}: LeftSidebarProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 h-full">
      {order.map((id) => {
        const Icon = iconMap[id];
        const isOpen = openPanels.includes(id);

        return (
          <button
            key={id}
            onClick={() => onTogglePanel(id)}
            className="p-2 transition-all"
          >
            <Icon
              className={`w-6 h-6 ${isOpen ? "text-black" : "text-gray-400"}`}
            />
          </button>
        );
      })}
    </div>
  );
}
