import {Injectable} from '@angular/core';
import {Tag} from '../model/tag/tag.model';
import {TagsService} from './tag/tags.service';
import {StacksService} from './stack/stacks.service';
import {CardsService} from './card/cards.service';
import {Stack} from '../model/stack/stack.model';
import {Card} from '../model/card/card.model';
import {Side} from '../model/card/side/side.model';
import {AspectType} from '../model/card/aspect.type';
import {SideAspect} from '../model/card/side/side-aspect';

/**
 * Handles matching
 */
@Injectable()
export class MatchService {

  /**
   * Normalizes a string in order to make comparison less prone to errors
   * @param value input value
   * @returns normalized string
   */
  static normalize(value: string): string {
    return (value != null) ? value
      .toString()
      .trim()
      .toLowerCase()
      .replace(new RegExp('ä', 'g'), 'ae')
      .replace(new RegExp('ö', 'g'), 'oe')
      .replace(new RegExp('ü', 'g'), 'ue')
      .replace(new RegExp('ß', 'g'), 'ss')
      .replace(new RegExp('ß', 'g'), 'ss')
      .replace(new RegExp('\\.', 'g'), 'dot')
      .replace(new RegExp('\\+', 'g'), 'plus')
      .replace(new RegExp('\\/', 'g'), 'slash')
      .replace(new RegExp('&', 'g'), 'and')
      .replace(new RegExp('#', 'g'), 'sharp') : '';
  }

  /**
   * Compares two string values
   * @param value1 first value
   * @param value2 second value
   * @returns 1 if the first values comes after the second one, otherwise -1
   */
  static compare(value1: string, value2: string) {
    return MatchService.normalize(value1) > MatchService.normalize(value2) ? 1 : -1;
  }

  //
  // String
  //

  /**
   * Determines whether a value contains a specific item
   * @param value value to check
   * @param item single word
   * @returns true if value includes word
   */
  static valueMatchesSingleItem(value: string, item: string): boolean {
    return value != null
      && item != null
      && item.trim() !== ''
      && MatchService.normalize(value).includes(MatchService.normalize(item.toString()));
  }

  /**
   * Splits a item into an array of items using space as an delimiter where words can be grouped by surrounding them
   * with double quotes
   * @param items search items formatted as a single string
   * @returns array of search items
   */
  static splitSearchItems(items: string): string[] {

    if (items == null) {
      return [];
    }

    const itemArray = MatchService.normalize(items).match(/\w+|"[^"]+"/g);

    if (itemArray == null) {
      return [];
    }

    let i = itemArray.length;
    while (i--) {
      itemArray[i] = itemArray[i].replace(/"/g, '');
    }

    return itemArray;
  }

  /**
   * Determines whether a text matches a single item
   * @param text text to check
   * @param item search item
   * @returns true if text matches search item
   */
  static textMatchesSingleItem(text: string, item: string): boolean {
    return MatchService.valueMatchesSingleItem(text, item);
  }

  /**
   * Determines whether a stack matches a single item
   * @param stack stack to check
   * @param item search item
   * @returns true if task matches search item
   */
  static stackTitleMatchesSingleItem(stack: Stack, item: string): boolean {
    return (stack != null) ? MatchService.textMatchesSingleItem(stack.title, item) : false;
  }

  /**
   * Determines whether a cards matches a single item
   * @param card to check
   * @param item search item
   * @returns true if project matches search item
   */
  static cardMatchesSingleItem(card: Card, item: string): boolean {
    const sideAspect = card.aspects.filter(aspect => {
      return aspect.type === AspectType.SIDE;
    })[0] as SideAspect;

    return (sideAspect != null) ? sideAspect.sides.some(side => {
      return MatchService.sideMatchesSingleItem(side, item);
    }) : false;
  }

  /**
   * Determines whether a side matches a single item
   * @param side side to check
   * @param item search item
   * @returns true if task matches search item
   */
  static sideMatchesSingleItem(side: Side, item: string): boolean {
    return (side != null) ? MatchService.textMatchesSingleItem(side.title, item) : false;
  }

  /**
   * Determines whether a tag's name matches a single item
   * @param tag tag to check
   * @param item search item
   * @returns true if tag's name matches search item
   */
  static tagNameMatchesSingleItem(tag: Tag, item: string): boolean {
    return (tag != null) ? MatchService.textMatchesSingleItem(tag.name, item) : false;
  }

  //
  // Favorites
  //

  /**
   * Determines whether a card matches favorites flag
   * @param card card
   * @param favorites favorites flag
   */
  static cardMatchesFavorites(card: Card, favorites: boolean) {
    return !favorites || card.favorite;
  }

  /**
   * Constructor
   * @param stacksService stacks service
   * @param cardsService cards service
   * @param tagsService tags service
   */
  constructor(private stacksService: StacksService,
              private cardsService: CardsService,
              private tagsService: TagsService) {
  }

  //
  // Tags
  //

  /**
   * Determines whether a stack matches a given set of tags
   * @param stack stack to check
   * @param tags array of tags the stack should contain
   * @returns true if stack matches given tags
   */
  public stackMatchesTags(stack: Stack, tags: Tag[]): boolean {
    return tags.length === 0 || (stack.tagIds != null && stack.tagIds.map(id => {
      return this.tagsService.getTagById(id);
    }).filter(tag => {
      return tag != null;
    }).some(tag => {
      return this.tagMatchesTags(tag, tags);
    }));
  }

  /**
   * Determines whether a card matches a given set of tags
   * @param card card to check
   * @param tags array of tags the card should contain
   * @returns true if card matches given tags
   */
  public cardMatchesTags(card: Card, tags: Tag[]): boolean {
    return tags.length === 0 || (card.tagIds != null && card.tagIds.map(id => {
      return this.tagsService.getTagById(id);
    }).filter(tag => {
      return tag != null;
    }).some(tag => {
      return this.tagMatchesTags(tag, tags);
    }));
  }

  /**
   * Determines whether a tag matches a given set of tags
   * @param tag tag to check
   * @param tags array of tags the tag should be contained in
   * @returns true if tag matches given tags
   */
  public tagMatchesTags(tag: Tag, tags: Tag[]) {
    return (tag == null && tags.length === 0)
      || tags.some(t => {
        return tag != null && tag.id != null && t.id === tag.id;
      });
  }

  //
  // Search item
  //

  /**
   * Determines whether a stack matches every of the specified items
   * @param stack stack to check
   * @param items multiple words in one string
   * @returns true if stack matches every search item
   */
  public stackMatchesEveryItem(stack: Stack, items: string): boolean {
    return items == null || items.trim() === '' || MatchService.splitSearchItems(items).every(item => {
      return MatchService.stackTitleMatchesSingleItem(stack, item);
      /*
      || (stack.cards != null && this.cardsMatchesSingleItem(stack.cards, item))
      || (stack.tagIds != null && this.tagsMatchesSingleItem(stack.tagIds.map(id => {
        return this.tagsService.getTagById(id);
      }).filter(tag => {
        return tag != null;
      }), item));
    */
    });
  }

  /**
   * Determines whether a card matches every of the specified items
   * @param card card to check
   * @param items multiple words in one string
   * @returns true if card matches every search item
   */
  public cardMatchesEveryItem(card: Card, items: string): boolean {
    return items == null || items.trim() === '' || MatchService.splitSearchItems(items).every(item => {
      return (card != null && MatchService.cardMatchesSingleItem(card, item))
        || (card != null && card.tagIds != null && this.tagsMatchesSingleItem(card.tagIds.map(id => {
          return this.tagsService.getTagById(id);
        }).filter(tag => {
          return tag != null;
        }), item));
    });
  }

  /**
   * Determines whether a tag matches every of the specified items
   * @param tag tag to check
   * @param items multiple words in one string
   * @returns true if tag matches every search item
   */
  public tagMatchesEveryItem(tag: Tag, items: string): boolean {
    return items == null || items.trim() === '' || MatchService.splitSearchItems(items).every(item => {
      return MatchService.tagNameMatchesSingleItem(tag, item);
    });
  }

  //
  // Search item parts
  //

  /**
   * Determines whether at least one card of a given array matches a given search item
   * @param cards array of cards to check
   * @param item search item
   * @returns true if at least one card matches search item
   */
  private cardsMatchesSingleItem(cards: Card[], item: string): boolean {
    return cards != null && cards.some(c => {
      return MatchService.cardMatchesSingleItem(c, item);
    });
  }

  /**
   * Determines whether at least one tag of a given array matches a given search item
   * @param tags array of tags to check
   * @param item search item
   * @returns true if at least one tag matches search item
   */
  private tagsMatchesSingleItem(tags: Tag[], item: string): boolean {
    return tags != null && tags.some(t => {
      return MatchService.textMatchesSingleItem(t.name, item);
    });
  }
}
