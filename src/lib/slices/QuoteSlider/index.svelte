<script lang="ts">
  import { isFilled, type Content } from "@prismicio/client";
  import Slider from "$lib/components/Slider.svelte";
  import WcButton from "$lib/components/WcButton.svelte";
  import { hrefOf } from "$lib/links";

  let { slice }: { slice: Content.QuoteSliderSlice } = $props();

  const bg = $derived(
    isFilled.image(slice.primary.background_image) ? slice.primary.background_image.url : null,
  );
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="relative mb-48 max-[991px]:mx-[4%]"
>
  <div
    class="relative mx-auto -mt-32 max-w-[1280px] px-[6%] pt-24 pb-8 text-white max-[479px]:-mt-8 max-[479px]:pt-8 {bg
      ? 'bg-transparent bg-[0_0] max-[767px]:-mt-8'
      : 'bg-[#004a80f2]'}"
    style={bg ? `background-image: url("${bg}")` : undefined}
  >
    <Slider
      itemCount={slice.items.length}
      label="Testimonials"
      class="min-h-[30rem] max-[991px]:px-[4%]"
      showDots={!slice.items.some((item) => item.heading)}
      navigationClass="absolute inset-x-0 -bottom-4 mt-0!"
      arrowClass="text-white! hover:bg-transparent!"
      nextArrowClass="hover:opacity-80 aria-disabled:hover:opacity-40"
      pauseClass="text-white! hover:bg-transparent!"
      dotClass="bg-white/60"
      activeDotClass="bg-white"
    >
      {#snippet children({ index })}
        {@const item = slice.items[index]}
        {@const href = hrefOf(item.button_link)}
        <div
          class="flex min-h-[30rem] flex-col items-start {item.heading
            ? 'justify-between'
            : 'justify-center'}"
        >
          {#if item.heading}
            <p class="wc-h1 text-left text-gold">
              {item.heading}{#if item.accent}<br />{item.accent}{/if}
            </p>
          {/if}
          {#if item.quote}
            <blockquote class="{item.heading ? 'font-light' : ''} wc-h3 text-left text-white">
              {item.quote}
            </blockquote>
          {/if}
          {#if item.attribution}
            <p
              class="mt-8 text-[22px] leading-[35px] text-white max-[479px]:text-[18px] max-[479px]:leading-[25px]"
            >
              {item.attribution}
            </p>
          {/if}
          {#if href && item.button_label}
            <WcButton {href} variant="white">{item.button_label}</WcButton>
          {/if}
        </div>
      {/snippet}
    </Slider>
  </div>
</section>
