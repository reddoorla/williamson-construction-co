<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import ButtonRow from "$lib/components/ButtonRow.svelte";

  let { slice }: { slice: Content.SectorFeatureSlice } = $props();

  const cardRight = $derived(slice.primary.card_side === "right");
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell relative pb-24"
>
  <div
    class="flex flex-col gap-12 lg:items-start {cardRight ? 'lg:flex-row-reverse' : 'lg:flex-row'}"
  >
    <div class="relative bg-primary px-12 pt-20 pb-16 text-white lg:-mt-48 lg:w-[40%]">
      {#if isFilled.image(slice.primary.icon)}
        <PrismicImage
          field={slice.primary.icon}
          alt=""
          class="absolute -top-16 left-8 h-32 w-32 {cardRight ? 'lg:left-auto lg:right-8' : ''}"
        />
      {/if}
      <p class="text-base font-bold">{slice.primary.label}</p>
      <div class="mt-4 text-base leading-7"><PrismicRichText field={slice.primary.body} /></div>
    </div>
    <div class="lg:w-[50%] lg:pt-8">
      <h2 class="text-left">
        <span class="wc-h2 block text-primary">{slice.primary.heading}</span>
        {#if slice.primary.accent}
          <span class="wc-h2 block text-secondary">{slice.primary.accent}</span>
        {/if}
      </h2>
      <ButtonRow items={slice.items} grounds={["white"]} fallback="primary" class="mt-12" />
    </div>
  </div>
</section>
