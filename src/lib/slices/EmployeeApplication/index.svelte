<script lang="ts">
  import type { Content } from "@prismicio/client";
  import WcButton from "$lib/components/WcButton.svelte";
  import { mediaUrl } from "$lib/links";

  let { slice }: { slice: Content.EmployeeApplicationSlice } = $props();

  const file = $derived(mediaUrl(slice.primary.file));
  const email = $derived(slice.primary.email?.trim() || null);
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="pt-16">
  <h2
    class="mx-auto w-[40%] pb-8 text-center text-[35px] leading-[45px] font-medium text-primary max-[991px]:w-[80%] max-[991px]:px-[10%] max-[767px]:w-full max-[767px]:px-[4%]"
  >
    {slice.primary.heading}
  </h2>
  <div
    class="mx-auto mb-8 flex max-w-[1280px] flex-col items-center justify-between pb-8 max-[991px]:mb-0 max-[991px]:px-[10%] max-[767px]:px-[4%]"
  >
    <p class="wc-p mb-4 text-center text-primary">
      {slice.primary.body}
      {#if email}<br /><a href="mailto:{email}" class="text-primary">{email}</a>{/if}
    </p>
    {#if file}
      <WcButton href={file} grounds={["white"]}
        >{slice.primary.button_label || "Employee Application"}</WcButton
      >
    {/if}
  </div>
</section>
