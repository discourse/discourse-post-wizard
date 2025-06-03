import Component from "@ember/component";
import { tagName } from "@ember-decorators/component";
import ConditionalLoadingSpinner from "discourse/components/conditional-loading-spinner";
import SiteSetting from "admin/components/site-setting";
import SiteSettingModel from "admin/models/site-setting";

@tagName("")
export default class PostWizard extends Component {
  settingsList;
  siteSettings;
  isLoadingSiteSettings = false;

  init() {
    super.init(...arguments);

    this.set("isLoadingSiteSettings", true);

    SiteSettingModel.findAll()
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

  <template>
    <ConditionalLoadingSpinner @condition={{this.isLoadingSiteSettings}}>
      {{#each this.siteSettings as |setting|}}
        <SiteSetting @setting={{setting}} />
      {{/each}}
    </ConditionalLoadingSpinner>
  </template>
}
