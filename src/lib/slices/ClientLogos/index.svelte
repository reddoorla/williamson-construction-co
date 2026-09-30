<script lang="ts">
  import { PrismicImage } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.ClientLogosSlice } = $props();

  const logos = $derived(slice.items.filter((item) => isFilled.image(item.logo)));
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell pb-24"
>
  {#if slice.primary.heading}
    <h2 class="wc-h3 mb-12 text-center text-primary">{slice.primary.heading}</h2>
  {/if}
  <ul class="flex flex-wrap items-center justify-center gap-x-12 gap-y-10" aria-label="Clients">
    {#each logos as item, i (i)}
      <li class="w-[40%] sm:w-[18%]">
        <PrismicImage
          field={item.logo}
          fallbackAlt=""
          class="mx-auto max-h-24 w-full object-contain"
        />
      </li>
    {/each}
  </ul>
</section>
