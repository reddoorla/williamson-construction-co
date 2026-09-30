<script lang="ts">
  import type { LinkField } from "@prismicio/client";
  import WcButton from "$lib/components/WcButton.svelte";
  import { isButtonVariant, type ButtonVariant } from "$lib/button-styles";
  import { buttonsOf } from "$lib/links";

  type Item = { button_label: string | null; button_link: LinkField; button_style?: string | null };
  type Props = { items: readonly Item[]; fallback?: ButtonVariant; class?: string };

  let { items, fallback = "gold", class: passedClasses = "" }: Props = $props();

  const buttons = $derived(buttonsOf(items));
</script>

{#if buttons.length > 0}
  <div class="flex flex-wrap gap-x-8 gap-y-4 {passedClasses}">
    {#each buttons as button, i (i)}
      <WcButton
        href={button.href}
        variant={isButtonVariant(button.item.button_style) ? button.item.button_style : fallback}
        >{button.label}</WcButton
      >
    {/each}
  </div>
{/if}
