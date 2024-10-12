// scrollHandle.js
export const handleScroll = () => {
    const scrollY = window.scrollY + window.innerHeight / 2;
    const sections = document.querySelectorAll(".full-page");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        section.classList.add("visible");
        console.log("Section visible:", section);
      } else {
        section.classList.remove("visible");
      }
    });
};
