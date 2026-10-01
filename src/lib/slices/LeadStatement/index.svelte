<script lang="ts">
  import type { Content } from "@prismicio/client";

  let { slice }: { slice: Content.LeadStatementSlice } = $props();
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="py-16">
  <div class="mx-auto max-w-[1280px] max-[991px]:px-[10%] max-[767px]:px-[4%]">
    <p
      class="mb-[10px] pr-[25%] pl-16 text-[35px] leading-[50px] font-light text-primary max-[991px]:px-0 max-[767px]:text-[25px] max-[767px]:leading-[35px] max-[479px]:text-[20px] max-[479px]:leading-[30px]"
    >
      {slice.primary.body}
    </p>
  </div>
</section>
