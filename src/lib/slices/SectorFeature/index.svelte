<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import ButtonRow from "$lib/components/ButtonRow.svelte";

  let { slice }: { slice: Content.SectorFeatureSlice } = $props();

  const cardRight = $derived(slice.primary.card_side === "right");
</script>

{#snippet card()}
  <div
    class="relative -top-40 min-h-96 w-[40%] bg-[#004a80f2] px-[6%] pt-16 pb-8 text-white max-[991px]:absolute max-[991px]:-top-24 max-[991px]:left-[10%] max-[991px]:w-[80%] max-[991px]:pt-24 max-[767px]:left-[8%] max-[767px]:w-[86%] max-[479px]:pt-8"
  >
    <div class="wc-p [&_p]:mb-[10px]">
      <p><strong class="font-semibold">{slice.primary.label}</strong></p>
      <PrismicRichText field={slice.primary.body} />
    </div>
    {#if isFilled.image(slice.primary.icon)}
      <div
        class={cardRight
          ? "absolute -top-32 right-8 w-[37.5%] max-[991px]:w-[30%] max-[767px]:-top-16 max-[479px]:-top-[4.7rem]"
          : "absolute -top-28 left-[4%] w-[37.5%] max-[991px]:-top-24 max-[991px]:w-[30%] max-[767px]:-top-16 max-[479px]:-top-[3.7rem]"}
      >
        <PrismicImage field={slice.primary.icon} alt="" class="block h-full w-full" />
      </div>
    {/if}
  </div>
{/snippet}

{#snippet text()}
  <div
    class="my-8 h-80 w-[46%] p-6 max-[991px]:h-auto max-[991px]:w-full max-[991px]:pt-80 {cardRight
      ? 'max-[991px]:pl-0'
      : 'max-[991px]:px-[6%]'}"
  >
    <h2 class="text-left">
      <span class="wc-h2 block text-primary max-[767px]:text-[45px] max-[767px]:leading-[55px]"
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
      class="mt-6 pt-6 max-[479px]:flex-col max-[479px]:items-center"
    />
  </div>
{/snippet}

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  {#if cardRight}
    <div
      class="relative mx-auto flex max-w-[1280px] justify-between max-[991px]:block max-[991px]:px-[10%] max-[767px]:px-[8%]"
    >
      {@render text()}
      {@render card()}
    </div>
  {:else}
    <div
      class="relative mx-auto flex max-w-[1280px] justify-between p-6 max-[991px]:px-[10%] max-[767px]:px-[4%]"
    >
      {@render card()}
      {@render text()}
    </div>
  {/if}
</section>
