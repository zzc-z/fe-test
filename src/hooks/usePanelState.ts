"use client";

import { useState, useCallback } from "react";

export type PanelId = "map" | "music" | "chat";

export interface PanelState {
  id: PanelId;
  isOpen: boolean;
}

export function usePanelState() {
  const [panels, setPanels] = useState<PanelState[]>([
    { id: "map", isOpen: true },
    { id: "music", isOpen: true },
    { id: "chat", isOpen: true },
  ]);

  const [order, setOrder] = useState<PanelId[]>(["map", "music", "chat"]);

  const togglePanel = useCallback((id: PanelId) => {
    setPanels((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, isOpen: !panel.isOpen } : panel,
      ),
    );
  }, []);

  const setPanelOrder = useCallback((newOrder: PanelId[]) => {
    setOrder(newOrder);
  }, []);

  const openPanel = useCallback((id: PanelId) => {
    setPanels((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, isOpen: true } : panel,
      ),
    );
  }, []);

  const getOpenPanels = useCallback(() => {
    return order.filter((id) => panels.find((p) => p.id === id)?.isOpen);
  }, [order, panels]);

  return {
    panels,
    order,
    togglePanel,
    setPanelOrder,
    openPanel,
    getOpenPanels,
  };
}
