<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import ButtonRow from "$lib/components/ButtonRow.svelte";

  let { slice }: { slice: Content.SectorFeatureSlice } = $props();

  const cardRight = $derived(slice.primary.card_side === "right");
</script>

{#snippet card()}
  <div
    class="relative -top-40 min-h-96 w-[40%] bg-[#004a80f2] px-[6%] pt-16 pb-8 text-white max-[992px]:absolute max-[992px]:-top-24 max-[992px]:left-[10%] max-[992px]:w-[80%] max-[992px]:pt-24 max-[768px]:left-[8%] max-[768px]:w-[86%] max-[480px]:pt-8"
  >
    <div class="wc-p [&_p]:mb-[10px]">
      <p><strong class="font-semibold">{slice.primary.label}</strong></p>
      <PrismicRichText field={slice.primary.body} />
    </div>
    {#if isFilled.image(slice.primary.icon)}
      <div
        class={cardRight
          ? "absolute -top-32 right-8 w-[37.5%] max-[992px]:w-[30%] max-[768px]:-top-16 max-[480px]:-top-[4.7rem]"
          : "absolute -top-28 left-[4%] w-[37.5%] max-[992px]:-top-24 max-[992px]:w-[30%] max-[768px]:-top-16 max-[480px]:-top-[3.7rem]"}
      >
        <PrismicImage field={slice.primary.icon} alt="" class="block h-full w-full" />
      </div>
    {/if}
  </div>
{/snippet}

{#snippet text()}
  <div
    class="my-8 h-80 w-[46%] p-6 max-[992px]:h-auto max-[992px]:w-full max-[992px]:pt-80 {cardRight
      ? 'max-[992px]:pl-0'
      : 'max-[992px]:px-[6%]'}"
  >
    <h2 class="text-left">
      <span class="wc-h2 block text-primary max-[768px]:text-[45px] max-[768px]:leading-[55px]"
        >{slice.primary.heading}</span
      >
      {#if slice.primary.accent}
        <span class="wc-h2 block text-secondary">{slice.primary.accent}</span>
      {/if}
    </h2>
    <ButtonRow
      items={slice.items}
      grounds={["white"]}
      fallback="primary"
      gap="gap-x-16 gap-y-8"
      class="mt-6 pt-6 max-[480px]:flex-col max-[480px]:items-center"
    />
  </div>
{/snippet}

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  {#if cardRight}
    <div
      class="relative mx-auto flex max-w-[1280px] justify-between max-[992px]:block max-[992px]:px-[10%] max-[768px]:px-[8%]"
    >
      {@render text()}
      {@render card()}
    </div>
  {:else}
    <div
      class="relative mx-auto flex max-w-[1280px] justify-between p-6 max-[992px]:px-[10%] max-[768px]:px-[4%]"
    >
      {@render card()}
      {@render text()}
    </div>
  {/if}
</section>
