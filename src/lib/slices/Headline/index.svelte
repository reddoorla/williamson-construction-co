<script lang="ts">
  import type { Content } from "@prismicio/client";

  let { slice }: { slice: Content.HeadlineSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  id={slice.primary.section_id || undefined}
  class="wc-headline"
>
  <div class="wc-headline-box">
    <h2 class="wc-h3 text-center text-primary">
      {slice.primary.heading}
      {#if slice.primary.accent}<br />{slice.primary.accent}{/if}
    </h2>
  </div>
</section>

<style>
  .wc-headline-box {
    max-width: 940px;
    margin-inline: auto;
    padding-block: 8rem;
  }
  @media (max-width: 991px) {
    .wc-headline-box {
      max-width: 728px;
    }
  }
  @media (max-width: 767px) {
    .wc-headline-box {
      max-width: none;
    }
  }
  :global(.wc-headline:has(+ [data-slice-type="sector_cards"])) {
    margin-bottom: 24rem;
  }
  :global(.wc-headline:has(+ [data-slice-type="sector_cards"]) .wc-headline-box) {
    padding-bottom: 0;
  }
  @media (max-width: 991px) {
    :global(.wc-headline:has(+ [data-slice-type="sector_cards"])) {
      margin-bottom: 16rem;
    }
  }
  :global(.wc-headline:has(+ [data-slice-type="phase_detail"])) {
    margin-bottom: 8rem;
  }
  :global(.wc-headline:has(+ [data-slice-type="phase_detail"]) .wc-headline-box) {
    max-width: 1280px;
    padding-block: 0;
  }
  :global(.wc-headline:has(+ [data-slice-type="phase_detail"]) h2::after) {
    content: "\200d";
    display: block;
  }
  @media (max-width: 991px) {
    :global(.wc-headline:has(+ [data-slice-type="phase_detail"]) .wc-headline-box) {
      padding-inline: 10%;
    }
  }
  @media (max-width: 767px) {
    :global(.wc-headline:has(+ [data-slice-type="phase_detail"]) .wc-headline-box) {
      padding-inline: 4%;
    }
  }
  :global(.wc-headline:has(+ [data-slice-type="contact_card"])) {
    padding-block: 2rem;
  }
  :global(.wc-headline:has(+ [data-slice-type="contact_card"]) .wc-headline-box) {
    max-width: none;
    padding-block: 0;
  }
  :global(.wc-headline:has(+ [data-slice-type="contact_card"]) h2) {
    width: 60%;
    margin: 0 auto 2rem;
    font-size: 35px;
    line-height: 45px;
  }
  @media (max-width: 991px) {
    :global(.wc-headline:has(+ [data-slice-type="contact_card"]) h2) {
      width: 80%;
      padding-inline: 10%;
    }
  }
  @media (max-width: 767px) {
    :global(.wc-headline:has(+ [data-slice-type="contact_card"])) {
      padding-block: 1rem;
    }
    :global(.wc-headline:has(+ [data-slice-type="contact_card"]) h2) {
      width: 90%;
      padding-inline: 4%;
    }
  }
</style>
