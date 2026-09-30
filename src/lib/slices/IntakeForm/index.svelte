<script lang="ts">
  import type { Content } from "@prismicio/client";
  import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "$lib/contact";

  let { slice }: { slice: Content.IntakeFormSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell py-16"
>
  <h2 class="wc-h3 mx-auto max-w-[560px] text-center text-primary">{slice.primary.heading}</h2>
  <p class="mt-8 text-center text-base text-primary">
    Email us at <a href={CONTACT_EMAIL_HREF} class="text-primary underline">{CONTACT_EMAIL}</a>.
  </p>
</section>
