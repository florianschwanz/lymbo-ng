import {Pipe, PipeTransform} from '@angular/core';
import {Tag} from '../../../core/entity/model/tag/tag.model';

/**
 * Transforms a list of tags into a list of their names
 */
@Pipe({
  name: 'tagNames'
})
export class TagNamesPipe implements PipeTransform {

  /**
   * Transforms a list of tags into a list of their names
   * @param tags lists of tags
   * @param args arguments
   */
  transform(tags: Tag[], args?: any): string[] {
    return tags.map(tag => {
      return tag.name;
    });
  }
}
