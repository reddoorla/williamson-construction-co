<script lang="ts">
  import { PrismicRichText } from "@prismicio/svelte";
  import type { Content } from "@prismicio/client";

  let { slice }: { slice: Content.StatementBandSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="mb-32 max-[992px]:mx-[4%]"
>
  <div
    class="mx-auto max-w-[1280px] bg-primary py-8 text-center text-white max-[992px]:px-[10%] max-[768px]:px-[4%]"
  >
    <h2 class="wc-h3 py-8 text-white">
      {slice.primary.heading}{#if slice.primary.accent}&nbsp;<span class="wc-h3 text-gold"
          >{slice.primary.accent}</span
        >{/if}
    </h2>
    <div
      class="wc-statement mx-[14%] pb-8 text-[2.25rem] leading-[1.6em] font-light max-[992px]:mx-0 max-[992px]:text-[2rem] max-[768px]:text-[1.4rem]"
    >
      <PrismicRichText field={slice.primary.body} />
    </div>
  </div>
</section>
