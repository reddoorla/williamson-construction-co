<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.LeadershipSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell relative z-10 pt-8"
>
  {#if slice.primary.heading}
    <h2 class="wc-h3 text-center text-primary">{slice.primary.heading}</h2>
  {/if}
  <ul class="mt-32 flex flex-col gap-32 lg:flex-row lg:items-start lg:justify-around lg:gap-4">
    {#each slice.items as item, i (i)}
      <li class="relative bg-primary/90 px-8 pt-32 pb-24 text-white lg:w-[32%]">
        {#if isFilled.image(item.photo)}
          <PrismicImage
            field={item.photo}
            alt=""
            class="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full object-cover"
            imgixParams={{ w: 400, h: 400, fit: "crop" }}
          />
        {/if}
        <h3 class="wc-h2 text-center text-white">{item.name}</h3>
        <p class="wc-h2 text-center text-white">{item.role}</p>
        <div class="mt-8 text-base leading-7 font-light"><PrismicRichText field={item.bio} /></div>
      </li>
    {/each}
  </ul>
</section>
