<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.SectorCardsSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell pt-16 pb-24"
>
  <ul class="grid gap-24 md:grid-cols-2 md:gap-10">
    {#each slice.items as item, i (i)}
      <li class="relative bg-primary px-12 pt-20 pb-16 text-white">
        {#if isFilled.image(item.icon)}
          <PrismicImage
            field={item.icon}
            alt=""
            class="absolute -top-16 h-32 w-32 {i % 2 === 1 ? 'right-8' : 'left-8'}"
          />
        {/if}
        <h3 class="text-base font-bold">{item.label}</h3>
        <div class="mt-4 text-base leading-7"><PrismicRichText field={item.body} /></div>
      </li>
    {/each}
  </ul>
</section>
