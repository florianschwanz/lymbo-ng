import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

/**
 * Represents icon topic subdirectory
 */
enum IconTopic {
  ACTION = 'action',
  ALERT = 'alert',
  AV = 'av',
  CONTENT = 'content',
  COMMUNICATION = 'communication',
  DEVICE = 'device',
  EDITOR = 'editor',
  FILE = 'file',
  HARDWARE = 'hardware',
  IMAGE = 'image',
  MAPS = 'maps',
  NAVIGATION = 'navigation',
  SOCIAL = 'social'
}

/**
 * Represents a material design icon
 */
class Icon {
  /** Topic */
  topic: IconTopic;
  /** Name */
  name: string;
  /** File */
  file: string;

  /**
   * Constructor
   * @param {IconTopic} topic
   * @param {string} name
   * @param {string} file
   */
  constructor(topic: IconTopic, name: string, file: string) {
    this.topic = topic;
    this.name = name;
    this.file = file;
  }
}

/**
 * Handles Material icons
 */
@Injectable({
  providedIn: 'root'
})
export class MaterialIconService {

  /** Root directory of material design icons */
  private ICON_ROOT_DIR = '../assets/material-design-icons';
  /** Icon variant */
  private VARIANT = 'production';


  /**
   * Initializes icons
   *
   * @param iconRegistry icon registry
   * @param sanitizer sanitizer
   */
  public initializeIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const icons: Icon[] = [];
    icons.push(new Icon(IconTopic.ACTION, 'android', 'ic_android_24px.svg'));
    icons.push(new Icon(IconTopic.ACTION, 'delete', 'ic_delete_24px.svg'));
    icons.push(new Icon(IconTopic.ACTION, 'label_outline', 'ic_label_outline_24px.svg'));
    icons.push(new Icon(IconTopic.ACTION, 'search', 'ic_search_24px.svg'));
    icons.push(new Icon(IconTopic.ACTION, 'settings', 'ic_settings_24px.svg'));
    icons.push(new Icon(IconTopic.CONTENT, 'add', 'ic_add_24px.svg'));
    icons.push(new Icon(IconTopic.CONTENT, 'filter_list', 'ic_filter_list_24px.svg'));
    icons.push(new Icon(IconTopic.CONTENT, 'reply', 'ic_reply_24px.svg'));
    icons.push(new Icon(IconTopic.CONTENT, 'undo', 'ic_undo_24px.svg'));
    icons.push(new Icon(IconTopic.EDITOR, 'mode_edit', 'ic_mode_edit_24px.svg'));
    icons.push(new Icon(IconTopic.FILE, 'file_download', 'ic_file_download_24px.svg'));
    icons.push(new Icon(IconTopic.FILE, 'file_upload', 'ic_file_upload_24px.svg'));
    icons.push(new Icon(IconTopic.MAPS, 'layers_clear', 'ic_layers_clear_24px.svg'));
    icons.push(new Icon(IconTopic.NAVIGATION, 'arrow_back', 'ic_arrow_back_24px.svg'));
    icons.push(new Icon(IconTopic.NAVIGATION, 'check', 'ic_check_24px.svg'));
    icons.push(new Icon(IconTopic.NAVIGATION, 'close_18', 'ic_close_18px.svg'));
    icons.push(new Icon(IconTopic.NAVIGATION, 'menu', 'ic_menu_24px.svg'));
    icons.push(new Icon(IconTopic.NAVIGATION, 'more_vert', 'ic_more_vert_24px.svg'));
    icons.push(new Icon(IconTopic.NAVIGATION, 'refresh', 'ic_refresh_24px.svg'));

    // Aliases
    icons.push(new Icon(IconTopic.ACTION, 'alias_tag', 'ic_label_outline_24px.svg'));

    icons.forEach(icon => {
      iconRegistry.addSvgIcon(icon.name,
        sanitizer.bypassSecurityTrustResourceUrl(this.ICON_ROOT_DIR + '/' + icon.topic + '/svg/' + this.VARIANT + '/' + icon.file));
    });

    iconRegistry.addSvgIcon('blank', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic_blank_24px.svg'));
  }
}