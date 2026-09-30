<script lang="ts">
  import { FOOTER_LINKS, LICENSE_LINE } from "$lib/contact";

  const year = new Date().getFullYear();
</script>

<footer class="bg-light py-16 text-black">
  <div class="wc-shell flex flex-col justify-between gap-8 sm:flex-row">
    <a href="/" class="block self-start" aria-label="Williamson Construction, home">
      <img src="/images/wcc-logo.svg" alt="" class="block h-24 w-auto" />
    </a>
    <nav aria-label="Footer">
      <ul class="flex flex-col gap-2 sm:text-right">
        {#each FOOTER_LINKS as link (link.href)}
          <li><a href={link.href} class="inline-block py-2 text-black">{link.label}</a></li>
        {/each}
      </ul>
    </nav>
  </div>
  <div class="wc-shell mt-8 text-sm">
    <p><em>© Williamson Construction {year}, All Rights Reserved</em></p>
    <p class="mt-2">{LICENSE_LINE}</p>
  </div>
</footer>
