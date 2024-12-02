// import { action } from "@ember/object";
// import { ajax } from "discourse/lib/ajax";
// import { popupAjaxError } from "discourse/lib/ajax-error";
import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";
import SiteSetting from "admin/models/site-setting";

@tagName("")
export default class PostWizard extends Component {
  settingsList;
  siteSettings;
  isLoadingSiteSettings = false;

  init() {
    super.init(...arguments);

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
  }
}
