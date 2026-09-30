<script lang="ts">
  import { PrismicRichText } from "@prismicio/svelte";
  import type { Content } from "@prismicio/client";

  let { slice }: { slice: Content.StatementBandSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell mb-32"
>
  <div class="bg-primary px-[8%] py-12 text-center text-white">
    <h2 class="wc-h3 text-white">
      {slice.primary.heading}{#if slice.primary.accent}&nbsp;<span class="wc-h3 text-gold"
          >{slice.primary.accent}</span
        >{/if}
    </h2>
    <div
      class="wc-statement mx-auto mt-8 max-w-[920px] text-[30px] leading-[1.6em] font-light max-md:text-[22px]"
    >
      <PrismicRichText field={slice.primary.body} />
    </div>
  </div>
</section>
