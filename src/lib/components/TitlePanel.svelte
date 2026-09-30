<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = { media?: Snippet; heading: Snippet; aside?: Snippet; align?: "left" | "center" };

  let { media, heading, aside, align = "left" }: Props = $props();
</script>

<div class="relative">
  <div class="relative h-[500px] overflow-hidden bg-primary lg:h-[700px]">
    {@render media?.()}
  </div>
  <div
    class="relative mx-[4%] -mt-40 bg-primary/90 px-[4%] py-8 text-white lg:mx-auto lg:max-w-[1280px] lg:py-10"
  >
    <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
      <div class="lg:w-2/3 {align === 'center' ? 'lg:text-center' : ''}">
        {@render heading()}
      </div>
      {#if aside}
        <div class="lg:w-1/3">{@render aside()}</div>
      {/if}
    </div>
  </div>
</div>
