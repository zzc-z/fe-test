"use client";

import { usePanelState } from "@/hooks/usePanelState";
import LeftSidebar from "@/components/LeftSidebar";
import PanelContainer from "@/components/PanelContainer";

export default function Home() {
  const { order, togglePanel, setPanelOrder, getOpenPanels } = usePanelState();
  const openPanels = getOpenPanels();

  return (
    <div className="flex h-screen">
      <LeftSidebar
        order={order}
        openPanels={openPanels}
        onTogglePanel={togglePanel}
      />
      <main className="flex-1 overflow-hidden">
        <PanelContainer
          order={order}
          openPanels={openPanels}
          onOrderChange={setPanelOrder}
          onClosePanel={togglePanel}
        />
      </main>
    </div>
  );
}
