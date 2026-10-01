<script lang="ts">
  import type { LinkField } from "@prismicio/client";
  import WcButton from "$lib/components/WcButton.svelte";
  import { isLegibleOn, legibleVariant, type ButtonVariant, type Ground } from "$lib/button-styles";
  import { buttonsOf } from "$lib/links";

  type Item = { button_label: string | null; button_link: LinkField; button_style?: string | null };
  type Props = {
    items: readonly Item[];
    grounds: readonly Ground[];
    fallback?: ButtonVariant;
    restyle?: Partial<Record<ButtonVariant, ButtonVariant>>;
    gap?: string;
    class?: string;
  };

  let {
    items,
    grounds,
    fallback = "gold",
    restyle = {},
    gap = "gap-x-8 gap-y-4",
    class: passedClasses = "",
  }: Props = $props();

  const pick = (style: string | null | undefined) => {
    const variant = legibleVariant(style, grounds, fallback);
    const swapped = restyle[variant];
    return swapped && isLegibleOn(swapped, grounds) ? swapped : variant;
  };

  const buttons = $derived(buttonsOf(items));
</script>

{#if buttons.length > 0}
  <div class="flex flex-wrap {gap} {passedClasses}">
    {#each buttons as button, i (i)}
      <WcButton href={button.href} variant={pick(button.item.button_style)} {grounds}
        >{button.label}</WcButton
      >
    {/each}
  </div>
{/if}
