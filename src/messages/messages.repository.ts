// repository are classes that performs data persistence, and saves data to any database using typeorm module

import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages[id];
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const id = Math.floor(Math.random() * 9999); //generate unique id for each message
    messages[id] = { id, content }; //replacing existing message with id and content
    await writeFile('messages.json', JSON.stringify(messages));
  }
}

export { MessagesRepository };
