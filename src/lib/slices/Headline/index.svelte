<script lang="ts">
  import type { Content } from "@prismicio/client";

  let { slice }: { slice: Content.HeadlineSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  id={slice.primary.section_id || undefined}
>
  <div
    class="mx-auto max-w-[940px] py-32 text-center max-[991px]:max-w-[728px] max-[767px]:max-w-none"
  >
    <h2 class="wc-h3 text-primary">
      {slice.primary.heading}
      {#if slice.primary.accent}<br />{slice.primary.accent}{/if}
    </h2>
  </div>
</section>
