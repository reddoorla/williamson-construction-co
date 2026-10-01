<script lang="ts">
  import type { Snippet } from "svelte";

  export type TitleLayout = "split" | "buttons" | "plain" | "columns" | "project";

  type Props = {
    media?: Snippet;
    heading: Snippet<[string]>;
    aside?: Snippet;
    layout?: TitleLayout;
    align?: "left" | "center";
  };

  let { media, heading, aside, layout: given, align = "left" }: Props = $props();

  const layout = $derived(given ?? (aside ? "columns" : "plain"));

  const headingClass = $derived(
    {
      split: "m-6",
      buttons: "m-6 p-2",
      plain: "m-6 p-2",
      columns: "m-6 p-2",
      project: "m-6 p-2 max-[991px]:text-[40px] max-[991px]:leading-[55px] max-[479px]:mx-0",
    }[layout] + (align === "center" ? " text-center" : " text-left"),
  );
</script>

<div class="relative">
  <div
    class="relative flex h-[700px] items-center justify-center overflow-hidden max-[991px]:h-[500px]"
  >
    {@render media?.()}
  </div>
  <div
    class="relative mx-auto -mt-40 max-w-[1280px] bg-primary py-5 text-white opacity-90 max-[991px]:mx-[4%] max-[991px]:pb-0 max-[479px]:pt-0 max-[479px]:pb-2"
  >
    {#if layout === "split"}
      <div class="flex px-4 max-[991px]:flex-col max-[991px]:px-[4%] max-[479px]:pt-[4%]">
        <div class="w-2/3 max-[991px]:w-full">
          {@render heading(headingClass)}
        </div>
        <div class="wc-title-aside w-1/3 px-6 max-[991px]:w-full">{@render aside?.()}</div>
      </div>
    {:else if layout === "columns" || layout === "project"}
      <div class="flex max-[767px]:flex-col">
        <div class="w-2/3 px-2.5 max-[767px]:w-full">
          {@render heading(headingClass)}
        </div>
        <div class="w-1/3 px-4 max-[767px]:w-full">{@render aside?.()}</div>
      </div>
    {:else}
      {@render heading(headingClass)}
      {#if aside && layout === "buttons"}
        <div class="m-6 p-2 pb-8">{@render aside()}</div>
      {/if}
    {/if}
  </div>
</div>
