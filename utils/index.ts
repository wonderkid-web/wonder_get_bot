import TelegramBot from "node-telegram-bot-api";
import { IFetchURL, TResponse } from "../types";

export const ambil = /^ambil$/;

export const optionsButton: TelegramBot.SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "posts",
          callback_data: "posts",
        },
        {
          text: "photos",
          callback_data: "photos",
        },
        {
          text: "users",
          callback_data: "users",
        },
        {
          text: "kucing",
          callback_data: "kucing",
        },
      ],
    ],
  },
};

export const optionsHTML: TelegramBot.SendMessageOptions = {
  parse_mode: "HTML",
};

export const fetchURL: IFetchURL = {
  photos: Bun.env.API_PHOTOS!,
  posts: Bun.env.API_POSTS!,
  users: Bun.env.API_USERS!,
  kucing: Bun.env.API_KUCING!
};

export const getData = async <DataType>(
  url: TResponse
): Promise<DataType[]> => {
  const raw = await fetch(fetchURL[url]);
  return (await raw.json()) as DataType[];
};
