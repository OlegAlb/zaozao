import { Emoji } from '../../modules/common/types/Emoji';

export type Key = {
  value: Emoji | string;
};

export type Group = {
  id: string;
  name: string;
  emojis: Emoji[];
};
