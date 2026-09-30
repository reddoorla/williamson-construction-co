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
    <PrismicImage
      field={slice.primary.image}
      fallbackAlt=""
      class="block w-full"
      imgixParams={{ w: 2400 }}
      loading="lazy"
    />
  {/if}
</section>
