<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.PhaseDetailSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  id={slice.primary.section_id || undefined}
  class="mb-60 scroll-mt-24"
>
  <div class="mx-auto max-w-[1280px] max-[991px]:px-[10%] max-[767px]:px-[4%]">
    <div class="relative mb-16 bg-light py-4">
      <h2
        class="wc-h2 m-6 p-6 text-left text-primary max-[767px]:p-0 max-[479px]:text-[30px] max-[479px]:leading-[40px]"
      >
        {slice.primary.heading}
      </h2>
      {#if isFilled.image(slice.primary.icon)}
        <PrismicImage
          field={slice.primary.icon}
          alt=""
          class="absolute -top-40 left-12 w-48 max-[767px]:-top-24 max-[767px]:w-32"
        />
      {/if}
    </div>
    <div
      class="wc-p wc-phase-body mx-6 mb-[10px] px-6 text-primary max-[767px]:mx-0 max-[767px]:px-0"
    >
      <PrismicRichText field={slice.primary.body} />
    </div>
  </div>
</section>

<style>
  :global([data-slice-type="phase_detail"]:not(:has(~ [data-slice-type="phase_detail"]))) {
    margin-bottom: 12rem;
  }
  .wc-phase-body :global(p + p),
  .wc-phase-body :global(ul + p) {
    margin-top: 1.6em;
  }
  .wc-phase-body :global(ul li)::before {
    content: "- ";
  }
</style>
