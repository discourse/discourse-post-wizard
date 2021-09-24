import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  api.decorateCookedElement((element) => {
    const wizards = element.querySelectorAll("[data-wrap='wizard']");

    if (!wizards.length) {
      return;
    }

    wizards.forEach((wizard) => {
      if (!api.getCurrentUser()?.admin) {
        wizard.remove();
        return;
      }

      const settingsList = (wizard.dataset.settings || "")
        .split(",")
        .filter(Boolean);

      const component = api.container.owner
        .factoryFor("component:post-wizard")
        .create({ settingsList });

      component.renderer.appendTo(component, wizard);
    });
  });
});
