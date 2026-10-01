<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.SectorCardsSlice } = $props();
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  <ul
    class="relative mx-auto flex max-w-[1280px] justify-between p-6 max-[992px]:flex-col max-[992px]:px-[10%] max-[768px]:px-[4%]"
  >
    {#each slice.items as item, i (i)}
      <li
        class="relative -top-40 min-h-96 w-[47.5%] bg-[#004a80f2] px-[6%] pt-16 pb-8 text-white max-[992px]:-top-24 max-[992px]:mx-auto max-[992px]:mb-32 max-[992px]:pt-24 max-[480px]:pt-8"
      >
        <div class="wc-p [&_p]:mb-[10px]">
          <h3 class="mb-[10px]"><strong class="font-semibold">{item.label}</strong></h3>
          <PrismicRichText field={item.body} />
        </div>
        {#if isFilled.image(item.icon)}
          <div
            class={i % 2 === 1
              ? "absolute -top-32 right-8 w-[37.5%] max-[992px]:w-[30%] max-[768px]:-top-16 max-[480px]:-top-[4.7rem]"
              : "absolute -top-28 left-[4%] w-[37.5%] max-[992px]:-top-24 max-[992px]:w-[30%] max-[768px]:-top-16 max-[480px]:-top-[3.7rem]"}
          >
            <PrismicImage field={item.icon} alt="" class="block h-full w-full" />
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</section>
