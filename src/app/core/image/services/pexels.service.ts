import {EventEmitter, Injectable} from '@angular/core';
import {ConnectionService} from '../../common/services/connection.service';
import {SettingsService} from '../../settings/services/settings.service';
import {SettingType} from '../../settings/model/setting-type.enum';
import {HttpClient} from '@angular/common/http';
import {SearchResult} from '../model/search-result';

/**
 * Handles image lookup via Pexels
 */
@Injectable({
  providedIn: 'root'
})
export class PexelsService {

  /**
   * Constructor
   * @param connectionService connection service
   * @param settingsService settings service
   * @param httpClient http client
   */
  constructor(private connectionService: ConnectionService,
              private settingsService: SettingsService,
              private httpClient: HttpClient) {
  }

  /**
   * Translates a given word into a target tense
   * @param searchItems search items
   * @param perPage results per page
   * @param page page index
   * @param resultEmitter result emitter
   */
  search(searchItems: string[], perPage: number, page: number, resultEmitter: EventEmitter<SearchResult>) {
    if (ConnectionService.isOnline()) {
      const apiKey = this.settingsService.settings.get(SettingType.API_KEY_PEXELS_IMAGE);

      if (searchItems != null && searchItems.length > 0 && apiKey != null) {
        const options = {
          method: 'GET',
          headers: {
            'Authorization': apiKey.value
          },
          json: true,
        };

        const ob = this.httpClient.get(`https://api.pexels.com/v1/search?query=${searchItems.join('+')}&per_page=${perPage}&page=${page}`, options);
        ob.subscribe(value => {
          resultEmitter.emit(value as SearchResult);
        });
      }
    } else {
      console.error('Client is offline');
    }
  }
}