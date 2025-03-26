function mobileNav() {
  const navBtnOpen = document.querySelector("#modalOpen");
  const navBtnClose = document.querySelector("#modalClose");
  const mobileNavOverlay = document.querySelector("#mobileNavOverlay");
  const mobileNav = document.querySelector("#mobileNav");

  navBtnOpen.onclick = toggleMobileNav;
  navBtnClose.onclick = toggleMobileNav;
  mobileNavOverlay.onclick = toggleMobileNav;

  function toggleMobileNav() {
    mobileNavOverlay.classList.toggle("mobile-nav-overlay--open");
    mobileNav.classList.toggle("mobile-nav--open");
    document.body.classList.add("no-scroll");
  }
}

export default mobileNav;
