import {Injectable} from '@angular/core';
import {Feature} from '../model/feature.model';
import {FeatureType} from '../model/feature-type.enum';
import {ColorService} from '../../ui/services/color.service';
import {SettingsService} from './settings.service';

/**
 * Handles features
 */
@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  /** List of features */
  features: Feature[];

  /**
   * Constructor
   * @param colorService color service
   * @param settingsService settings service
   */
  constructor(private colorService: ColorService,
              private settingsService: SettingsService) {
    this.initializeFeatures();
  }

  //
  // Initialization
  //

  /**
   * Initializes features
   */
  private initializeFeatures() {
    this.features = [];

    const featureTypes = Object.keys(FeatureType).map(key => FeatureType[key]);

    featureTypes.forEach(type => {
      const iconColor = this.colorService.getFeatureTypeColor(type).contrast;
      const backgroundColor = this.colorService.getFeatureTypeColor(type).color;

      switch (type) {
        case FeatureType.UNDEFINED: {
          break;
        }
      }
    });
  }

  /**
   * Determines if a feature is active
   * @param featureType feature type
   */
  public isFeatureActive(featureType: FeatureType): boolean {
    return this.features.filter(feature => {
      return feature.type === featureType;
    }).some(feature => {
      const settingType = feature.settingType;
      return this.settingsService.settings.get(settingType) != null
        && this.settingsService.settings.get(settingType).value === true;
    });
  }
}
