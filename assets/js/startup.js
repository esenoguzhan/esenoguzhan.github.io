(function () {
  "use strict";

  var menu = document.querySelector(".menu-toggle");
  var navigation = document.getElementById("primary-nav");

  function closeMenu(returnFocus) {
    if (!menu || !navigation) return;
    navigation.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
    if (returnFocus) menu.focus();
  }

  if (menu && navigation) {
    menu.addEventListener("click", function () {
      var isOpen = navigation.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(isOpen));
      menu.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navigation.classList.contains("is-open")) closeMenu(true);
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".site-header")) closeMenu(false);
    });
    var mobileLayout = window.matchMedia("(max-width: 680px)");
    if (mobileLayout.addEventListener) {
      mobileLayout.addEventListener("change", function () { closeMenu(false); });
    }
  }

  var panel = document.querySelector(".learning-panel");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".workflow-tab"));
  var description = document.getElementById("workflow-description");
  var copy = document.getElementById("workflow-copy");
  var steps = {
    demonstrate: "Start with human demonstrations. Capture the task, the motion, and what success looks like.",
    learn: "Develop a policy from demonstrations. Explore how a learned skill can adapt to a new task.",
    evaluate: "Compare rollouts, inspect failures, and test physical constraints before hardware deployment."
  };

  function selectStep(tab, focus) {
    var step = tab.getAttribute("data-step");
    if (!steps[step] || !panel || !copy || !description) return;
    tabs.forEach(function (item) {
      var selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("data-step", step);
    description.setAttribute("aria-labelledby", tab.id);
    copy.textContent = steps[step];
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { selectStep(tab, false); });
    tab.addEventListener("keydown", function (event) {
      var target;
      if (event.key === "ArrowRight") target = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") target = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") target = 0;
      else if (event.key === "End") target = tabs.length - 1;
      else return;
      event.preventDefault();
      selectStep(tabs[target], true);
    });
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
