import TelegramBot from "node-telegram-bot-api";
import { IKucing, IPhoto, IPost, IUser, TResponse } from "./types";
import { ambil, getData, optionsButton, optionsHTML } from "./utils";

const token = Bun.env.BOT_TOKEN!;
const options: TelegramBot.ConstructorOptions | undefined = {
  polling: true,
};

const wonderbot = new TelegramBot(token, options);

wonderbot.onText(ambil, async (callback) => {
  const sendId = callback.from?.id!;
  wonderbot.sendMessage(
    sendId,
    "Pilih Data Apa yang ingin kamu fetch",
    optionsButton
  );
});

wonderbot.on("callback_query", async (query) => {
  const chatId = query.message?.chat.id!; // ID obrolan pengguna
  const data: TResponse = query.data! as TResponse; // Nilai yang diterima dari tombol inline keyboard

  let boxData = "";

  if (data == "photos") {
    const results = await getData<IPhoto>("photos");
    results.forEach((res, i) => {
      i < 3 &&
        wonderbot.sendPhoto(chatId, res.thumbnailUrl as string, {
          caption: res.title,
        });
    });
  } else if (data == "kucing") {
    const results = await getData<IKucing>("kucing");

    wonderbot.sendPhoto(chatId, results[0].url as string, {
      caption: "Foto Kucing",
    });
  } else if (data == "posts") {
    const results = await getData<IPost>("posts");

    results.forEach((res, i) => {
      i < 5 && (boxData += `Post ke-${i + 1}: <b>${res.title}</b>\n`);
    });
  } else {
    const results = await getData<IUser>("users");

    results.forEach((res, i) => {
      i < 5 && (boxData += `Post ke-${i + 1}: <b>${res.username}</b>\n`);
    });
  }

  wonderbot.sendMessage(chatId, boxData, optionsHTML);
  // Mengirim pesan balasan ke pengguna
});
