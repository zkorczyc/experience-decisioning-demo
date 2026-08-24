"use client";

import { ActionGroup, Item } from "@adobe/react-spectrum";
import { Persona } from "@/lib/types";
import { Key } from "react";

export default function PersonaSwitcher({
  personas,
  selectedId,
  onChange,
}: {
  personas: Persona[];
  selectedId: string;
  onChange: (id: string) => void;
}) {
  return (
    <ActionGroup
      selectionMode="single"
      disallowEmptySelection
      overflowMode="wrap"
      selectedKeys={[selectedId]}
      onSelectionChange={(keys) => {
        const [first] = Array.from(keys as Set<Key>);
        if (first) onChange(String(first));
      }}
    >
      {personas.map((persona) => (
        <Item key={persona.id}>{persona.name}</Item>
      ))}
    </ActionGroup>
  );
}
