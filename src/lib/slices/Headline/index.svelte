<script lang="ts">
  import type { Content } from "@prismicio/client";

  let { slice }: { slice: Content.HeadlineSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  id={slice.primary.section_id || undefined}
  class="wc-shell py-16 text-center lg:py-24"
>
  <h2 class="wc-h3 mx-auto max-w-[920px] text-primary">
    {slice.primary.heading}
    {#if slice.primary.accent}<br />{slice.primary.accent}{/if}
  </h2>
</section>
