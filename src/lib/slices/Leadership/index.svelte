<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.LeadershipSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="relative z-10"
>
  <div class="mx-auto max-w-[1280px] max-[991px]:px-[10%] max-[767px]:px-[4%]">
    {#if slice.primary.heading}
      <h2 class="wc-h3 mb-8 pb-8 text-center text-primary">{slice.primary.heading}</h2>
    {/if}
    <ul class="mt-24 flex items-start justify-around max-[991px]:flex-col">
      {#each slice.items as item, i (i)}
        <li
          class="relative w-[32%] bg-[#004a80e6] px-8 pt-32 pb-24 text-white max-[991px]:mb-32 max-[991px]:w-full"
        >
          {#if isFilled.image(item.photo)}
            <div class="absolute -top-24 left-0 flex w-full justify-center">
              <PrismicImage
                field={item.photo}
                alt=""
                class="h-48 w-48 rounded-full object-cover"
                imgixParams={{ w: 400, h: 400, fit: "crop" }}
              />
            </div>
          {/if}
          <h3 class="wc-h2 text-center text-white">{item.name}</h3>
          <p class="wc-h2 text-center text-white">{item.role}</p>
          <div class="wc-p [&_p]:mb-[10px]"><PrismicRichText field={item.bio} /></div>
        </li>
      {/each}
    </ul>
  </div>
</section>
