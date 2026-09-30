<script lang="ts">
  import type { Content } from "@prismicio/client";

  let { slice }: { slice: Content.LeadStatementSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell py-16"
>
  <p
    class="text-[35px] leading-[50px] font-light text-primary max-md:text-[25px] max-md:leading-[35px] lg:pr-[25%] lg:pl-16"
  >
    {slice.primary.body}
  </p>
</section>
