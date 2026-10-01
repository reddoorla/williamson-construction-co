<script lang="ts">
  import { PrismicImage } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import ButtonRow from "$lib/components/ButtonRow.svelte";

  let { slice }: { slice: Content.ContactCardSlice } = $props();

  const email = $derived(slice.primary.email?.trim() || null);
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="mb-16">
  <div
    class="mx-auto flex max-w-[1280px] max-[991px]:flex-col max-[991px]:items-center max-[991px]:px-[10%] max-[767px]:px-[4%]"
  >
    <div class="flex w-1/2 flex-col items-center p-4 text-center">
      {#if isFilled.image(slice.primary.photo)}
        <PrismicImage
          field={slice.primary.photo}
          alt=""
          class="w-3/5 rounded-full"
          imgixParams={{ w: 600 }}
        />
      {/if}
      <h2 class="wc-h2 mt-4 text-primary">{slice.primary.name}</h2>
      <p class="wc-h3 text-primary">{slice.primary.role}</p>
    </div>
    <div class="w-1/2 p-4 max-[991px]:w-full">
      <div class="mb-8 bg-primary px-8 pb-4 text-white max-[479px]:bg-[#004a80e6]">
        <h3 class="wc-h3 mb-8 pt-8 text-left text-white">{slice.primary.heading}</h3>
        <p class="wc-p mb-[10px]">{slice.primary.body}</p>
        <ButtonRow
          items={slice.items}
          grounds={["primary"]}
          class="my-8 pb-4 max-[479px]:flex-col max-[479px]:items-start max-[479px]:pb-0"
        />
      </div>
      <address class="wc-p mb-[10px] text-primary not-italic">
        {#if email}<a href="mailto:{email}" class="text-primary">{email}</a><br />{/if}
        {#if slice.primary.address}{slice.primary.address}<br />{/if}
        {#if slice.primary.license}{slice.primary.license}{/if}
      </address>
    </div>
  </div>
</section>
