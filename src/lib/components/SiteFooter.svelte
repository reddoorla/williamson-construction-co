<script lang="ts">
  import { FOOTER_LINKS, LICENSE_LINE } from "$lib/contact";

  const year = new Date().getFullYear();
</script>

<footer class="bg-light text-black">
  <div class="py-32 text-[14px] leading-5">
    <div class="wc-shell flex flex-col md:flex-row md:items-start md:justify-between">
      <div class="pb-[83px] md:pb-16">
        <a
          href="/"
          class="inline-block rounded-[10px] px-[5px] align-baseline"
          aria-label="Williamson Construction, home"
        >
          <img src="/images/wcc-logo.svg" alt="" class="block h-24 w-auto" />
        </a>
      </div>
      <nav aria-label="Footer" class="my-10 md:my-0 md:pr-[10px]">
        <ul class="flex flex-col">
          {#each FOOTER_LINKS as link (link.href)}
            <li>
              <a
                href={link.href}
                class="inline-block rounded-[10px] p-6 text-[1.2rem] leading-5 font-medium text-black"
                >{link.label}</a
              >
            </li>
          {/each}
        </ul>
      </nav>
    </div>
    <div class="wc-shell">
      <p><em>© Williamson Construction {year}, All Rights Reserved</em></p>
      <p class="mt-8">{LICENSE_LINE}</p>
    </div>
  </div>
</footer>
