<script lang="ts">
  import { PrismicImage } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.FullWidthImageSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  id={slice.primary.section_id || undefined}
>
  {#if isFilled.image(slice.primary.image)}
    <div class="relative aspect-video overflow-hidden">
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <PrismicImage
          field={slice.primary.image}
          fallbackAlt=""
          class="block w-full"
          imgixParams={{ w: 2400 }}
          loading="lazy"
        />
      </div>
    </div>
  {/if}
</section>
