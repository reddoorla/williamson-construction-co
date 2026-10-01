<script lang="ts">
  import { PrismicImage } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import Slider from "$lib/components/Slider.svelte";
  import WcButton from "$lib/components/WcButton.svelte";

  let { slice }: { slice: Content.PhaseSliderSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  id={slice.primary.section_id || undefined}
  class="relative mb-24 max-[992px]:mx-[4%]"
>
  <div
    class="relative mx-auto -mt-32 max-w-[1280px] bg-[#004a80f2] px-[6%] pt-24 pb-8 text-white max-[480px]:-mt-8 max-[480px]:pt-8"
  >
    <Slider
      itemCount={slice.items.length}
      label="Our phases"
      class="max-[992px]:px-[4%] max-[768px]:pb-8"
      trackClass="-mt-80 pt-80"
      navigationClass="pointer-events-none absolute inset-x-0 bottom-0 mt-0! [&>*]:pointer-events-auto"
      arrowClass="text-gold! hover:bg-transparent!"
      nextArrowClass="hover:opacity-80 aria-disabled:hover:opacity-40"
      pauseClass="text-white! hover:bg-transparent!"
      dotClass="bg-white/60"
      activeDotClass="bg-white"
    >
      {#snippet children({ index })}
        {@const item = slice.items[index]}
        <div class="relative min-h-80 text-center">
          {#if isFilled.image(item.icon)}
            <PrismicImage
              field={item.icon}
              alt=""
              class="absolute -top-64 left-[40%] z-12 w-[20%] rounded-full border-2 border-gold max-[992px]:-top-40 max-[768px]:-top-56 max-[768px]:left-[30%] max-[768px]:w-[40%] max-[480px]:hidden"
            />
          {/if}
          <h3 class="wc-h3 text-white">{item.title}</h3>
          <p
            class="mt-8 text-[22px] leading-[35px] max-[992px]:mt-4 max-[992px]:text-[18px] max-[992px]:leading-[28px] max-[768px]:mt-2"
          >
            {item.body}
          </p>
          {#if item.anchor}
            <div class="flex justify-center">
              <WcButton href="#{item.anchor.replace(/^#/, '')}" class="mt-6"
                >{item.button_label || "See More"}</WcButton
              >
            </div>
          {/if}
        </div>
      {/snippet}
    </Slider>
  </div>
</section>
