"use client";

import { Item, Picker } from "@adobe/react-spectrum";
import { Vertical } from "@/lib/types";
import { useLocale } from "@/i18n/LocaleProvider";
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
  const { dict } = useLocale();
  const disabledKeys = verticals.filter((v) => v.disabled).map((v) => v.id);

  return (
    <Picker
      label={dict.scenarioSwitcherLabel}
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
