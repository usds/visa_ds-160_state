"use client";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setUserLocale } from "@/services/locale";
import { LanguageSelector } from "@trussworks/react-uswds";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  // TODO automate this from the locales in the config
  // TODO use label_local somehow
  // https://trussworks.github.io/react-uswds/?path=/docs/components-languageselector--docs
  const items: { value: Locale; label: string; label_local: string }[] = [
    {
      value: "en",
      label: t("en"),
      label_local: "English",
    },
    {
      value: "es",
      label: t("es"),
      label_local: "Español",
    },
    {
      value: "fr",
      label: t("fr"),
      label_local: "Français",
    },
  ];

  function onChange(loc) {
    startTransition(() => {
      setUserLocale(loc);
    });
  }

  const langs = items.map((item) => ({
    attr: item.value,
    label: item.label,
    on_click: () => {
      onChange(item.value);
    },
  }));

  return (
    <LanguageSelector
      id="locale-select"
      langs={langs}
      className={isPending && "opacity-60"}
      defaultValue={locale}
    />
  );
}
