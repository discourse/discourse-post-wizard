// import { action } from "@ember/object";
// import { ajax } from "discourse/lib/ajax";
// import { popupAjaxError } from "discourse/lib/ajax-error";
import Component from "@ember/component";
import SiteSetting from "admin/models/site-setting";

export default Component.extend({
  tagName: "",
  layoutName: "components/post-wizard",
  settingsList: null,
  siteSettings: null,
  isLoadingSiteSettings: false,

  init() {
    this._super(...arguments);

    this.set("isLoadingSiteSettings", true);

    SiteSetting.findAll()
      .then((settingsByCategories) => {
        const filteredSettings = settingsByCategories
          .flatMap((settings) => settings.siteSettings)
          .filter((siteSetting) => {
            return this.settingsList.includes(siteSetting.setting);
          });

        this.set("siteSettings", filteredSettings);
      })
      .finally(() => {
        this.set("isLoadingSiteSettings", false);
      });
  },
});
