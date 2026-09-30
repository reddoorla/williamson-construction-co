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
  class="wc-shell relative mb-24"
>
  <div class="relative -mt-20 bg-primary px-[6%] pt-8 pb-8 text-white">
    <Slider
      itemCount={slice.items.length}
      label="Our phases"
      arrowClass="text-gold! hover:bg-transparent! hover:opacity-80 aria-disabled:hover:opacity-40"
      dotClass="bg-white/60"
      activeDotClass="bg-gold"
    >
      {#snippet children({ index })}
        {@const item = slice.items[index]}
        <div class="flex flex-col items-center text-center md:px-12">
          {#if isFilled.image(item.icon)}
            <PrismicImage
              field={item.icon}
              alt=""
              class="h-32 w-32 rounded-full border-2 border-gold max-sm:hidden"
            />
          {/if}
          <h3 class="wc-h3 mt-6 text-white">{item.title}</h3>
          <p class="mt-6 text-base leading-7">{item.body}</p>
          {#if item.anchor}
            <WcButton href="#{item.anchor.replace(/^#/, '')}" class="mt-6"
              >{item.button_label || "See More"}</WcButton
            >
          {/if}
        </div>
      {/snippet}
    </Slider>
  </div>
</section>
