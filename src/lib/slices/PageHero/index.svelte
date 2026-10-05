<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import BgVideo from "$lib/components/BgVideo.svelte";
  import ButtonRow from "$lib/components/ButtonRow.svelte";
  import TitlePanel from "$lib/components/TitlePanel.svelte";
  import { mediaUrl } from "$lib/links";

  let { slice }: { slice: Content.PageHeroSlice } = $props();

  const mp4 = $derived(mediaUrl(slice.primary.video_mp4));
  const webm = $derived(mediaUrl(slice.primary.video_webm));
  const mobileMp4 = $derived(mediaUrl(slice.primary.video_mp4_mobile));
  const hasVideo = $derived(Boolean(mp4 || webm || mobileMp4));
  const hasBody = $derived(isFilled.richText(slice.primary.body));
  const hasButtons = $derived(slice.items.length > 0);
  const layout = $derived(
    hasBody && hasButtons ? "split" : hasButtons ? "buttons" : hasBody ? "columns" : "plain",
  );
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-page-hero"
>
  <TitlePanel {layout} align={slice.primary.heading_align === "center" ? "center" : "left"}>
    {#snippet media()}
      {#if hasVideo}
        <BgVideo
          {mp4}
          {webm}
          {mobileMp4}
          poster={slice.primary.background_image?.url}
          priority
          class="absolute inset-0 h-full w-full"
          controlClass="top-20 right-4"
        />
      {:else if isFilled.image(slice.primary.background_image)}
        <PrismicImage
          field={slice.primary.background_image}
          alt=""
          class="relative block h-auto w-full scale-110"
          imgixParams={{ w: 2400 }}
          loading="eager"
        />
      {/if}
    {/snippet}
    {#snippet heading(cls: string)}
      <h1 class="wc-h1 {cls}">{slice.primary.heading}</h1>
    {/snippet}
    {#snippet aside()}
      {#if layout === "split"}
        <div class="wc-hero-body [&_p]:my-8"><PrismicRichText field={slice.primary.body} /></div>
        <ButtonRow
          items={slice.items}
          grounds={["band-over-white", "band-over-black"]}
          gap="gap-x-8 gap-y-8"
          class="max-[480px]:flex-col max-[480px]:items-center"
        />
        <div class="h-16"></div>
      {:else if layout === "buttons"}
        <ButtonRow
          items={slice.items}
          grounds={["band-over-white", "band-over-black"]}
          class="pb-4 max-[480px]:flex-col max-[480px]:items-start max-[480px]:pb-0"
        />
      {:else if layout === "columns"}
        <div
          class="[&_p]:my-8 [&_p]:text-[1.875rem] [&_p]:leading-[1.6em] max-[480px]:[&_p]:text-[1.2rem]"
        >
          <PrismicRichText field={slice.primary.body} />
        </div>
      {/if}
    {/snippet}
  </TitlePanel>
</section>

<style>
  .wc-hero-body {
    font-size: 1.875rem;
    line-height: 1.6em;
  }
  @media (max-width: 479px) {
    .wc-hero-body {
      font-size: 1.2rem;
    }
  }
  :global(
    .wc-page-hero:has(+ [data-slice-type="headline"] + [data-slice-type="video_band"]) .wc-hero-body
  ) {
    font-size: 22px;
  }
  @media (max-width: 479px) {
    :global(
      .wc-page-hero:has(+ [data-slice-type="headline"] + [data-slice-type="video_band"])
        .wc-hero-body
    ) {
      font-size: 18px;
    }
  }
  @media (max-width: 767px) {
    :global(.wc-page-hero:has(+ [data-slice-type="lead_statement"]) h1) {
      margin: 0;
    }
    :global(.wc-page-hero:has(+ [data-slice-type="lead_statement"]) .wc-title-aside) {
      padding-inline: 0;
    }
  }
</style>
