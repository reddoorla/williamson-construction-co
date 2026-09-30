<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.PhaseDetailSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  id={slice.primary.section_id || undefined}
  class="wc-shell mt-40 mb-40 scroll-mt-24"
>
  <div class="relative bg-light px-[4%] py-10">
    {#if isFilled.image(slice.primary.icon)}
      <PrismicImage
        field={slice.primary.icon}
        alt=""
        class="absolute -top-24 left-12 w-32 md:-top-40 md:w-48"
      />
    {/if}
    <h2 class="wc-h2 text-left text-primary">{slice.primary.heading}</h2>
  </div>
  <div class="wc-prose wc-phase-body mt-16 px-[4%] text-primary">
    <PrismicRichText field={slice.primary.body} />
  </div>
</section>

<style>
  .wc-phase-body :global(ul) {
    margin-top: 0.25em;
  }
  .wc-phase-body :global(ul li)::before {
    content: "- ";
  }
</style>
