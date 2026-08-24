"use client";

import { Item, Picker } from "@adobe/react-spectrum";
import { Vertical } from "@/lib/types";
import { Key } from "react";

export default function VerticalSwitcher({
  verticals,
  selectedId,
  onChange,
}: {
  verticals: Vertical[];
  selectedId: string;
  onChange: (id: string) => void;
}) {
  const disabledKeys = verticals.filter((v) => v.disabled).map((v) => v.id);

  return (
    <Picker
      label="1. Choose your demo scenario"
      width="size-4600"
      selectedKey={selectedId}
      disabledKeys={disabledKeys}
      onSelectionChange={(key: Key | null) => key !== null && onChange(String(key))}
    >
      {verticals.map((vertical) => (
        <Item key={vertical.id}>{vertical.name}</Item>
      ))}
    </Picker>
  );
}
