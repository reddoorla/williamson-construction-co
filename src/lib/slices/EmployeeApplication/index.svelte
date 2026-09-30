<script lang="ts">
  import type { Content } from "@prismicio/client";
  import WcButton from "$lib/components/WcButton.svelte";
  import { mediaUrl } from "$lib/links";

  let { slice }: { slice: Content.EmployeeApplicationSlice } = $props();

  const file = $derived(mediaUrl(slice.primary.file));
  const email = $derived(slice.primary.email?.trim() || null);
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell pt-16 text-center"
>
  <h2 class="wc-h3 mx-auto max-w-[560px] text-primary">{slice.primary.heading}</h2>
  <p class="mt-8 text-base leading-7 text-primary">
    {slice.primary.body}
    {#if email}<br /><a href="mailto:{email}" class="text-primary">{email}</a>{/if}
  </p>
  {#if file}
    <WcButton href={file} grounds={["white"]} class="mt-4"
      >{slice.primary.button_label || "Employee Application"}</WcButton
    >
  {/if}
</section>
