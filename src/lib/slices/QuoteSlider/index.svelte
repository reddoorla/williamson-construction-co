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
  class="wc-shell relative mb-48"
>
  <div
    class="relative -mt-32 bg-primary bg-cover bg-center px-[6%] pt-16 pb-8 text-white md:pt-24"
    style={bg
      ? `background-image: linear-gradient(rgb(0 74 128 / 0.9), rgb(0 74 128 / 0.9)), url("${bg}")`
      : undefined}
  >
    <Slider
      itemCount={slice.items.length}
      label="Testimonials"
      arrowClass="text-gold! hover:bg-transparent!"
      nextArrowClass="hover:opacity-80 aria-disabled:hover:opacity-40"
      dotClass="bg-white/60"
      activeDotClass="bg-gold"
    >
      {#snippet children({ index })}
        {@const item = slice.items[index]}
        {@const href = hrefOf(item.button_link)}
        <div class="min-h-[18rem] md:px-12">
          {#if item.heading}
            <p class="text-left">
              <span class="wc-h2 block text-gold">{item.heading}</span>
              {#if item.accent}<span class="wc-h2 block text-gold">{item.accent}</span>{/if}
            </p>
          {/if}
          {#if item.quote}
            <blockquote class="{item.heading ? 'mt-12 font-light' : ''} wc-h3 text-left text-white">
              {item.quote}
            </blockquote>
          {/if}
          {#if item.attribution}
            <p class="mt-6 text-base text-white">{item.attribution}</p>
          {/if}
          {#if href && item.button_label}
            <WcButton {href} variant="white" class="mt-12">{item.button_label}</WcButton>
          {/if}
        </div>
      {/snippet}
    </Slider>
  </div>
</section>
